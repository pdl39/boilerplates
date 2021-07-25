import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Routes from './Routes';

const App = (props) => {
  return (
    <Provider store={store}>
      <Router >
        <Routes />
      </Router>
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;
