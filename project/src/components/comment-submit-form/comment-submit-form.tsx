import {useState, ChangeEvent, FormEvent, useEffect, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';
import { Review } from '../../types/reviews';
import { isSuccessSendMessage } from '../../store/action';

function CommentSubmitForm(): JSX.Element {

  const [review, setReview] = useState({comment: '', rating: 0});
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.activOfferId);
  const blockForm = useAppSelector((state) => state.idDisabledForm);
  const successSend = useAppSelector((state) => state.isSuccessSendMessage);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (successSend) {
      formRef.current?.reset();
      dispatch(isSuccessSendMessage(false));
    }}, [successSend]);


  const onSubmit = (userReview: Review) => {
    dispatch(sendCommentAction(userReview));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (review.comment !== null && review.rating !== null) {
      onSubmit({
        comment: review.comment,
        rating: Number(review.rating),
        id: id
      });
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="reviews__form form" action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setReview({...review, rating: Number(evt.target.value)})}
        className="reviews__rating-form form__rating"
      >

        <input disabled={blockForm} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={blockForm} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={blockForm} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={blockForm} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={blockForm} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        disabled={blockForm}
        minLength={50}
        maxLength={300}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) =>
          setReview({...review, comment: evt.target.value})}
        className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                                To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          disabled={review.rating === 0 || review.comment.length < 50 || review.comment.length > 300 || blockForm}
          className="reviews__submit form__submit button"
          type="submit"
        >Submit
        </button>
      </div>
    </form>

  );
}

export default CommentSubmitForm;
