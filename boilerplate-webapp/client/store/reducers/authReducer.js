import axios from 'axios';

// action types
export const SET_AUTH = 'SET_AUTH';
export const RENEW_TOKEN = 'RENEW_TOKEN';

// action creators
export const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    auth
  }
};


// thunk action creators
export const authenticate = (credentials) => { // credentials should be { username, password }
  return async (dispatch) => {
    try {
      const { data: { accessToken, refreshToken } } = await axios.post('/auth/user/login', credentials);
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      dispatch(getUserData());
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
};

export const getUserData = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('accessToken');
      if (token) {
        const authHeader = {
          authorization: token
        };

        const { data: auth } = await axios.get('/auth/user', { headers: { authorization: token } });
        return dispatch(setAuth(auth));
      }
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
};

export const signup = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/auth/user/signup`, formData);
      return res;
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
}

export const regenerateAccessToken = () => {
  return async (dispatch) => {
    try {
      const refreshToken = window.localStorage.getItem(refreshToken);
      if (refreshToken) {
        const { data: accessToken } = await axios.post('/auth/user/token', { token: refreshToken });

        window.localStorage.setItem('accessToken', accessToken);
        return;
      }
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
};

export const logout = (history) => {
  return async (dispatch) => {
    try {
      const refreshToken = window.localStorage.getItem(refreshToken);
      if (refreshToken) {
        const res = await axios.delete('/auth/user/logout', { token: refreshToken });

        window.localStorage.removeItem(accessToken);
        window.localStorage.removeItem(refreshToken);

        return dispatch(setAuth({}));
      }
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
};


// authReducer
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
};

export default authReducer;
