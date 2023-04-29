import {createReducer} from '@reduxjs/toolkit';
import { cityChanger, activeSortOption, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setPersonalDataUser, loadComments, setActivOfferId, loadNerbyOffers} from './action';
import { CITIES, SORT_OPTIONS, AuthorizationStatus } from '../const';
import { Offers } from '../types/offers';
import { UserPersonalData } from '../types/user-personal-data';
import { UserComments } from '../types/comments';

const emptyPersonalData = {
  'avatarUrl': '',
  'email': '',
  'id': 0,
  'isPro': true,
  'name': '',
  'token': ''
};

type initialStateType = {
  cities: string[];
  city: string;
  offers: Offers;
  activeSortOption: string;
  sortOptions: string[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  userPersonalData: UserPersonalData;
  comments: UserComments;
  activOfferId: number;
  nearbyOffers: Offers;
}

const initialState: initialStateType = {
  cities: CITIES,
  city: CITIES[0],
  offers: [],
  activeSortOption: 'Popular',
  sortOptions: SORT_OPTIONS,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  userPersonalData: emptyPersonalData,
  comments: [],
  activOfferId: 0,
  nearbyOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChanger, (state, action) => {
      state.city = action.payload.city;
    });
  builder
    .addCase(activeSortOption, (state, action) => {
      state.activeSortOption = action.payload.option;
    });
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
  builder
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
  builder
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
  builder
    .addCase(setPersonalDataUser, (state, action) => {
      state.userPersonalData = action.payload;
    });
  builder
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    });
  builder
    .addCase(setActivOfferId, (state, action) => {
      state.activOfferId = action.payload;
    });
  builder
    .addCase(loadNerbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});

export {reducer};
