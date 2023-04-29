import React from 'react';
import {useParams} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import { Offers } from '../../types/offers';

type OfferProps = {
    offers: Offers;
}

function Offer(props: OfferProps): JSX.Element {
  const params = useParams();
  const offer = props.offers.find((off) => String(off.id) === params.id);
  return offer ? <PropertyScreen offer={offer} /> : <NotFoundScreen />;
}

export default Offer;
