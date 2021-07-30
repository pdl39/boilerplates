import { combineReducers } from 'redux';
import dummies from './reducers/dummiesReducer';
import auth from './reducers/authReducer';

const rootReducer = combineReducers({
  dummies,
  auth
});

export default rootReducer;
