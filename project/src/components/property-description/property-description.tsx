import { Offer } from '../../types/offers';

type PropertDescriptionProps = {
    offer: Offer;

}
function PropertDescription({offer}: PropertDescriptionProps): JSX.Element {
  return (
    <>
      {offer.isPremium &&
      <div className="property__mark">
        <span>Premium</span>
      </div>}

      <div className="property__name-wrapper">
        <h1 className="property__name">
          {offer.title}
        </h1>
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{ width: offer.rating * 28 }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{offer.rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {offer.type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {offer.bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{offer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">

          {offer.goods.map((item) => (
            <li key={item} className="property__inside-item">
              {item}
            </li>))}

        </ul>
      </div>
    </>

  );

}

export default PropertDescription;
