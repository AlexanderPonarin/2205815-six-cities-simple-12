/* eslint-disable jsx-a11y/img-redundant-alt */

import { Offer } from '../../types/offers';
import PropertyImages from '../../components/property-image/property-images';
import PropertDescription from '../../components/property-description/property-description';
import PropertyHost from '../../components/property-host/property-host';
import PropertyReviews from '../../components/property-review/property-review';
import CommentSubmitForm from '../../components/comment-submit-form/comment-submit-form';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OfferList from '../../components/offer-list/offer-list';
import UserAuthCard from '../../components/user-auth-card/user-auth-card';
import { fetchCommentsAction, fetchNearbyOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


type PropertyScreenProps = {
  offer: Offer;
}

function PropertyScreen({offer}: PropertyScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const nerblyOffers = useAppSelector((state) => state.nearbyOffers);
  const sortedOffers = [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  useEffect(()=>{
    dispatch(fetchCommentsAction(offer.id));
    dispatch(fetchNearbyOffersAction(offer.id));
  }, [dispatch, offer.id]);

  return (
    <div className="page">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol>
        </svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a
                onClick={() => <Link to='/'/>}
                className="header__logo-link" href="#"
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <UserAuthCard />
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property" />
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.slice(0, 6).map((image) => <PropertyImages image={image} key={image}/>)}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            <PropertDescription offer={offer}/>
            <PropertyHost offer={offer}/>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.slice(0, 10).length}</span></h2>
              <ul className="reviews__list">
                {sortedOffers
                  .map((comment) => <PropertyReviews comment={comment} key={comment.id} />)}
              </ul>
              {authStatus === 'AUTH' ? <CommentSubmitForm /> : ''};
            </section>
          </div>
        </div>
        <Map
          offers={nerblyOffers.slice(0, 3).concat(offer)}
          city={offer}
          activeOfferId={offer.id}
          isPropertyScreenMap
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList
            offers={nerblyOffers.slice(0, 3)}
            cb={() => ''}
            isNearPlaceCard
          />
        </section>
      </div>
    </div>
  );
}

export default PropertyScreen;
