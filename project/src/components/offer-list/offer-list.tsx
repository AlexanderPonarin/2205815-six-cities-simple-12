import { useAppSelector } from '../../hooks';
import { Offers } from '../../types/offers';
import { sortOffers } from '../../utils';
import PlaceCard from '../place-card/place-card';

type OfferListProps = {
    offers: Offers;
    cb: (id: number) => void;
    isNearPlaceCard?: boolean;
}


function OfferList({offers, cb, isNearPlaceCard}: OfferListProps): JSX.Element {
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const sortOption = useAppSelector((state) => state.activeSortOption);
  const activeCity = useAppSelector((state) => state.city);

  return (
    <div
      className={isNearPlaceCard ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content'}
    >
      {isNearPlaceCard ?
        nearbyOffers.map((offer) => <PlaceCard cb={cb} offer={offer} key={offer.id} isNearPlaceCard={isNearPlaceCard}/>)
        :
        sortOffers(offers.filter((offer) => offer.city.name === activeCity), sortOption)
          .map((offer) => <PlaceCard cb={cb} offer={offer} key={offer.id} isNearPlaceCard={isNearPlaceCard}/>)}
    </div>
  );
}

export default OfferList;
