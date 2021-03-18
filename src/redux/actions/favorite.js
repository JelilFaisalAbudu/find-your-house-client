import { ADD_FAVORITE, REMOVE_FAVORITE } from './types';

const addFavorite = house => ({
  type: ADD_FAVORITE,
  payload: { house },
});

const removeFavorite = id => ({
  type: REMOVE_FAVORITE,
  payload: { id },
});

const favorite = {
  addFavorite,
  removeFavorite,
};

export default favorite;
