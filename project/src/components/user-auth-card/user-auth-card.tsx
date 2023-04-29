import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction} from '../../store/api-actions';


function UserAuthCard(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userPersonalData.email);

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">{userEmail}</span>
        </div>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#" onClick={(evt) => {
          evt.preventDefault();
          authorizationStatus !== 'AUTH' ?
            navigate('/login')
            :
            dispatch(logoutAction());
        }}
        >
          <span className="header__signout">{authorizationStatus === 'AUTH' ? 'Sign out' : 'Sign in'}</span>
        </a>
      </li>
    </ul>
  );
}

export default UserAuthCard;
