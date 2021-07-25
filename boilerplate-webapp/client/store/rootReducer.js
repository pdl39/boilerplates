import { combineReducers } from 'redux';
import dummies from './reducers/dummiesReducer';

const rootReducer = combineReducers({
  dummies
});

export default rootReducer;
