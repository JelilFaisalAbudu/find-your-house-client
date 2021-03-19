import { ADD_FAVORITE, REMOVE_FAVORITE, SET_MESSAGE } from './types';
import userServices from '../../services/user.service';

const doAddFavorite = house => ({
  type: ADD_FAVORITE,
  payload: { house },
});

const doRemoveFavorite = houseId => ({
  type: REMOVE_FAVORITE,
  payload: { houseId },
});

const addUserFavorite = (
  userId,
  houseId,
) => dispatch => userServices.addUserFavorite(
  userId,
  houseId,
).then(
  data => {
    dispatch(doAddFavorite(data));

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
  },
);

const removeUserFavorite = (
  userId,
  houseId,
) => dispatch => userServices.removeUserFavorite(
  userId,
  houseId,
).then(
  data => {
    dispatch(doRemoveFavorite(data));

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
  },
);

const userFavorites = {
  addUserFavorite,
  removeUserFavorite,
};

export default userFavorites;
