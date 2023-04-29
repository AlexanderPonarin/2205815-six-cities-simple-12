function NotFoundScreen() {
  return(
    <div style={{height: '10em', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
      <p>Error 404<br></br>
        NOT FOUND<br></br>
        <a href="http://localhost:3000/" style={{color: 'red'}}>GO TO HOME PAGE</a>
      </p>
    </div>
  );
}

export default NotFoundScreen;
