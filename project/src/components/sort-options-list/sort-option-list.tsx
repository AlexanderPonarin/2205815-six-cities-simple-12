import { useState } from 'react';
import SortOptionCard from '../sort-option-card/sort-option-card';
import { useAppSelector } from '../../hooks';

type SortOptionsProps = {
  sortOptions: string[];
}

function SortOptionList({sortOptions}: SortOptionsProps): JSX.Element {
  const [openList, setOpenList] = useState(false);
  const activeOption = useAppSelector((state) => state.activeSortOption);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setOpenList(!openList)}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={openList ?
        'places__options places__options--custom places__options--opened'
        :
        'places__options places__options--custom'}
      onClick={() => setOpenList(false)}
      >
        {sortOptions.map((item) => <SortOptionCard key ={item} option={item} /> )}
      </ul>
    </form>
  );
}

export default SortOptionList;
