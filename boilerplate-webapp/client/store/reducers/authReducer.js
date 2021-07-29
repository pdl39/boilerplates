import axios from 'axios';

// action types
export const LOGIN = 'LOGIN';

// action creators
export const login = (auth) => {
  return {
    type: LOGIN,
    auth
  }
};

// thunk action creators
export const attemptLogin = () => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.post('/api/login', { username, password });
      dispatch(login(user));
    }
    catch (err) {
      console.lor(err);
    }
  }
}

// authReducer
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
}

export default authReducer;
