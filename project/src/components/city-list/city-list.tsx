import CityCard from '../city-card/city-card';
import { useAppSelector } from '../../hooks';

function CityList(): JSX.Element {
  const cities: string[] = useAppSelector((state) => state.cities);
  return (
    <ul className="locations__list tabs__list">
      {cities.map((element) => <CityCard key={element} city={element} />)}
    </ul>
  );
}

export default CityList;
