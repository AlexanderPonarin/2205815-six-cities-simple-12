import { useAppDispatch } from '../../hooks';
import { activeSortOption } from '../../store/action';

type SortOptionCardProps = {
    option: string;
}


function SortOptionCard({option}: SortOptionCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <li className="places__option places__option--active" tabIndex={0}
      onClick={() => {
        dispatch(activeSortOption({option: option}));
      }}
    >{option}

    </li>
  );
}

export default SortOptionCard;
