import userServices from '../../services/user.service';
import { GET_HOUSES, SET_MESSAGE } from './types';

const getHouses = () => dispatch => {
  userServices.getPublicContent().then(data => {
    dispatch({
      type: GET_HOUSES,
      payload: { houses: data },
    });

    return Promise.resolve();
  },
  error => {
    const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  });
};

export default getHouses;
