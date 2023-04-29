import { Link } from 'react-router-dom';

function NotFoundScreen():JSX.Element {
  return(
    <div style={{height: '10em', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
      <p>Error 404<br></br>
        NOT FOUND<br></br>
        <a
          onClick={() => <Link to='/'/>}
          href="#" style={{color: 'red'}}
        >GO TO HOME PAGE
        </a>
      </p>
    </div>
  );
}

export default NotFoundScreen;
