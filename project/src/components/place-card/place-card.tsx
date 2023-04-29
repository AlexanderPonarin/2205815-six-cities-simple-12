import { useNavigate } from 'react-router-dom';
import { Offer } from '../../types/offers';
import { useAppDispatch } from '../../hooks';
import { fetchCommentsAction, fetchNearbyOffersAction } from '../../store/api-actions';
import { setActivOfferId } from '../../store/action';


type PlaceCardProps = {
  offer: Offer;
  cb: (id: number) => void;
  isNearPlaceCard?: boolean;
}

function PlaceCard({offer, cb, isNearPlaceCard}: PlaceCardProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <article
      onMouseOver={() => cb(offer.id)}
      className={isNearPlaceCard ? 'near-places__card place-card' : 'cities__card place-card' } id={String(offer.id)}
    >
      {offer.isPremium ?
        <div className="place-card__mark"><span>Premium</span></div>
        :
        ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a onClick = {(evt) => {
          evt.preventDefault();
          dispatch(fetchNearbyOffersAction(offer.id));
          dispatch(setActivOfferId(offer.id));
          dispatch(fetchCommentsAction(offer.id));
          navigate(`/offer/${offer.id}`);
        }} href="#"
        >
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: offer.rating * 14 }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a onClick = {(evt) => {
            evt.preventDefault();
            navigate(`offer/${offer.id}`);}} href="#"
          >
            {offer.title}
          </a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
