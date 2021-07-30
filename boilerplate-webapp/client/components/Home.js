import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <main>
      *** Webapp Boilerplate Home ***
      <div className="signup-login container">
        <Link to="/login">LOGIN</Link>
        <Link to="/signup">SIGN UP</Link>
      </div>
    </main>
  );
}

export default Home;
