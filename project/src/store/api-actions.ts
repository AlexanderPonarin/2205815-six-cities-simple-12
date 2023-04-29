import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Offer, Offers } from '../types/offers';
import { loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setPersonalDataUser, redirectToRoute, loadComments, loadNerbyOffers, loadOfferById, isDisableForm, isSuccessSendMessage } from './action';
import { AuthorizationStatus, TIMEOUT_SHOW_ERROR, emptyPersonalData } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { store } from '.';
import { UserPersonalData } from '../types/user-personal-data';
import { UserComments } from '../types/comments';
import { Review } from '../types/reviews';

export const fetchOfferAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'loadOffers',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<Offers>('/hotels');
      dispatch(setOffersDataLoadingStatus(false));
      dispatch(loadOffers(data));
    },
  );

export const fetchCommentsAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'loadComments',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<UserComments>(`/comments/${id}`);
      dispatch(loadComments(data));
    },
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'loadNearbyOffers',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Offers>(`/hotels/${id}/nearby`);
      dispatch(loadNerbyOffers(data));
    },
  );

export const fetchOfferByIdAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'loadOfferById',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Offer>(`/hotels/${id}`);
      dispatch(loadOfferById(data));
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<UserPersonalData>('/login');
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(setPersonalDataUser(data));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const {data} = await api.post<UserPersonalData>('/login', {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setPersonalDataUser(data));
      dispatch(redirectToRoute('/'));
    },
  );

export const sendCommentAction = createAsyncThunk<void, Review, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'comments/sendComment',
    async ({comment, rating, id}, {dispatch, extra: api}) => {
      dispatch(isDisableForm(true));
      try {
        const {data} = await api.post<UserComments>(`/comments/${id}`, {comment, rating});
        dispatch(loadComments(data));
        dispatch(isDisableForm(false));
        dispatch(isSuccessSendMessage(true));
      } catch {
        dispatch(isDisableForm(false));
        dispatch(isSuccessSendMessage(false));
      }
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/logout',
    async (_arg, {dispatch, extra: api}) => {
      await api.delete('/logout');
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setPersonalDataUser(emptyPersonalData));
    },
  );

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
