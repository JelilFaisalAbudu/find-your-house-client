import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialstate = {
  message: '',
  user: null,
};

const messageReducer = (state = initialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: payload };

    case CLEAR_MESSAGE:
      return { ...state, message: '' };
    default:
      return state;
  }
};

export default messageReducer;
