import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

// logger must be the last middleware in chain
// (if not, it will log thunk and promise instead of actual actions)
const middlewares = [
  reduxThunk
];

// use logger only in development
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
