import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import { Routes, Route } from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Offer from '../offer/offer';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOfferDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers);
  const sortOptions = useAppSelector((state) => state.sortOptions);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOfferDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path='/'
          element={
            <MainScreen
              offers={offers}
              sortOptions={sortOptions}
            />
          }
        />
        <Route
          path={'login'}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <LoginScreen />
            </PrivateRoute>
          }
        />
        <Route
          path='property'
          element={<PropertyScreen offer={offers[0]} />}
        />
        <Route
          path='*'
          element={<NotFoundScreen/>}
        />
        <Route
          path='offer/:id'
          element={<Offer offers={offers} />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
