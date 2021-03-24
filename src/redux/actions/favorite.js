import {
  GET_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_MESSAGE,
} from './types';
import userServices from '../../services/user.service';

const getUserFavorites = userId => dispatch => {
  userServices.getUserFavorites(userId).then(response => {
    dispatch({
      type: GET_FAVORITES,
      payload: { favorites: response },
    });
  });
};

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
  () => {
    dispatch(doRemoveFavorite(houseId));

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
  getUserFavorites,
  addUserFavorite,
  removeUserFavorite,
  doRemoveFavorite,
};

export default userFavorites;
