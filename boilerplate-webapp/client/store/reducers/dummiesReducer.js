import axios from 'axios';

// action types
export const GET_DUMMIES = 'GET_DUMMIES';

// action creators
export const getDummies = (dummies) => {
  return {
    type: GET_DUMMIES,
    dummies
  }
};

// thunk action creators
export const fetchDummies = (id) => {
  return async (dispatch) => {
    try {
      const { data: dummies } = await axios.get(`url/${id}`);
      dispatch(getDummies(dummies));
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }
}

// dummies initial state
const initialState = [];

// dummies reducer
const dummiesReducer = (state = initialState, action) => {
  switch (action.types) {
    case GET_DUMMIES:
      return action.dummies;
    default:
      return state;
  }
};

export default dummiesReducer;
