
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cityChanger } from '../../store/action';

type CityCardProps = {
    city: string;
}

function CityCard({city}: CityCardProps ): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item item"
      onClick={(evt) => {
        evt.preventDefault();
        dispatch(cityChanger({city: city}));
      }}
    >
      {activeCity === city ?
        <a className="locations__item-link tabs__item tabs__item--active" href="/">
          <span>{city}</span>
        </a> :
        <a className="locations__item-link tabs__item" href="/">
          <span>{city}</span>
        </a>}
    </li>
  );
}

export default CityCard;
