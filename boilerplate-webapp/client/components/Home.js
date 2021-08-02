import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';

const Home = (props) => {
  const name = useSelector(state => state.auth.nameFirst);

  return (
    <main>
      *** Webapp Boilerplate Home ***
      {!name
        ? < div className="signup-login container">
          <Link to="/login">LOGIN</Link>
          <Link to="/signup">SIGN UP</Link>
        </div>
        : <Dashboard name={name} />}
    </main >
  );
}

export default Home;
