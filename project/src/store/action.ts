import {createAction} from '@reduxjs/toolkit';
import { Offer, Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';
import { UserPersonalData } from '../types/user-personal-data';
import { UserComment, UserComments } from '../types/comments';

export const cityChanger = createAction('cityChanger', (payload: {city: string}) => ({payload}));

export const activeSortOption = createAction('activeSortOption', (payload: {option: string}) => ({payload}));

export const loadOffers = createAction<Offers>('loadOffers');

export const loadComments = createAction<UserComments>('loadComments');

export const loadNerbyOffers = createAction<Offers>('loadNerbyOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setError = createAction<string | null>('setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setQuestionsDataLoadingStatus');

export const setPersonalDataUser = createAction<UserPersonalData>('setEmailPersonalDataUser');

export const redirectToRoute = createAction<string>('redirectToRoute');

export const sebdNewComment = createAction<UserComment>('sebdNewComment');

export const setActivOfferId = createAction<number>('setActivOfferId');

export const loadOfferById = createAction<Offer>('loadOfferById');

export const isDisableForm = createAction<boolean>('isDisableForm');

export const isSuccessSendMessage = createAction<boolean>('isSuccessSendMessage');
