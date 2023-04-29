import { Offers } from './types/offers';

export const sortOffers = (offers: Offers, sortOption: string): Offers => {
  switch(sortOption) {
    case 'Popular':
      break;
    case 'Price: low to high':
      offers.sort((a,b) => a.price - b.price);
      break;
    case 'Price: high to low':
      offers.sort((a,b) => b.price - a.price);
      break;
    case 'Top rated first':
      offers.sort((a,b) => b.rating - a.rating);
      break;
  }
  return offers;
};
