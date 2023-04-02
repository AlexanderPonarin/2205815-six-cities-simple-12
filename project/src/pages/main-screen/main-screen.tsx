import { Offers } from '../../types/offers';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import CityList from '../../components/city-list/city-list';
import { useAppSelector } from '../../hooks';

type MainScreenProps = {
  offers: Offers;
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [offerId, setActivOfferId] = useState({id: 0});

  const setActiveOfferId = (id: number) => {
    setActivOfferId({...offerId, id: id});
  };

  const activeCity = useAppSelector((state) => state.city);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCity}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            {!offers.length ?
              <b>No Offers</b>
              :
              <OfferList offers={offers} cb={setActiveOfferId} />}
          </section>
          <div className="cities__right-section">
            <Map offers={offers} city={offers[0]} activeOfferId={offerId.id}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
