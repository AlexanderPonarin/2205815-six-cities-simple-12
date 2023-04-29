import { Offers } from '../../types/offers';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import CityList from '../../components/city-list/city-list';
import { useAppSelector } from '../../hooks';
import SortOptionList from '../../components/sort-options-list/sort-option-list';
import UserAuthCard from '../../components/user-auth-card/user-auth-card';
import NoOffersList from '../../components/no-offers-list';
import { Link } from 'react-router-dom';

type MainScreenProps = {
  offers: Offers;
  sortOptions: string[];
}

function MainScreen({offers, sortOptions}: MainScreenProps): JSX.Element {
  const [offerId, setActivOfferId] = useState({id: 0});

  const setActiveOfferId = (id: number) => {
    setActivOfferId({...offerId, id: id});
  };

  const activeCity = useAppSelector((state) => state.city);

  return (

    <div className="page page--gray page--main">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a
                onClick={() => <Link to='/'/>}
                className="header__logo-link header__logo-link--active"
              >
                <img className="header__logo" src="img/logo.svg" alt="six cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <UserAuthCard />
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          {!offers.length ? <NoOffersList />
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.filter((offer) => offer.city.name === activeCity).length} places to stay in {activeCity}</b>
                <SortOptionList sortOptions={sortOptions} />
                <OfferList offers={offers} cb={setActiveOfferId} />
              </section>
              <div
                className="cities__right-section"
              >
                <Map
                  offers={offers.filter((offer) => offer.city.name === activeCity)}
                  city={offers.filter((offer) => offer.city.name === activeCity)[0]}
                  activeOfferId={offerId.id}
                />
              </div>
            </div>}
        </div>
      </main>
    </div>

  );
}

export default MainScreen;
