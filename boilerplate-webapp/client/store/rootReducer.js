import { combineReducers } from 'redux';
import dummies from './reducers/dummiesReducer';
import user from './reducers/authReducer';

const rootReducer = combineReducers({
  dummies,
  user
});

export default rootReducer;
