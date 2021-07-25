import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

const App = (props) => {
  return (
    <Router >
      <Routes />
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;
