import { SET_MESSAGE, CLEAR_MESSAGE } from './types';

const setMessage = message => ({
  type: SET_MESSAGE,
  payload: message,
});

const clearmessage = () => ({ type: CLEAR_MESSAGE });

const message = {
  setMessage,
  clearmessage,
};

export default message;
