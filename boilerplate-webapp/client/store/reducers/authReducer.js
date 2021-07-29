import axios from 'axios';

// action types
export const SET_AUTH = 'SET_AUTH';
export const RENEW_TOKEN = 'RENEW_TOKEN';

// action creators
export const setAuth = (user) => {
  return {
    type: SET_AUTH,
    user
  }
};


// thunk action creators
export const authenticate = (username, password) => {
  return async (dispatch) => {
    try {
      const { data: { accessToken, refreshToken } } = await axios.post('/api/user/login', { username, password });
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      dispatch(getUserDate());
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
};

export const getUserData = () => {
  return async (dispatch) => {
    try {
      const accessToken = window.localStorage.getItem(accessToken);
      if (accessToken) {
        const authHeader = {
          authorization: accessToken
        };

        const { data: user } = await axios.get('/api/user', { headers: authHeader });
        return dispatch(setAuth(user));
      }
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
};

export const regenerateAccessToken = () => {
  return async (dispatch) => {
    try {
      const refreshToken = window.localStorage.getItem(refreshToken);
      if (refreshToken) {
        const { data: accessToken } = await axios.post('/api/user/token', { token: refreshToken });

        window.localStorage.setItem('accessToken', accessToken);
        return;
      }
    }
    catch (err) {
      return dispatch(setAuth({ error: err }));
    }
  }
};


export const logout = async (history) => {
  return async (dispatch) => {
    try {
      const refreshToken = window.localStorage.getItem(refreshToken);
      if (refreshToken) {
        const res = await axios.delete('/api/user/logout', { token: refreshToken });

        window.localStorage.removeItem(accessToken);
        window.localStorage.removeItem(refreshToken);
        history.push(`/login`);

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
      return action.user;
    default:
      return state;
  }
};

export default authReducer;
