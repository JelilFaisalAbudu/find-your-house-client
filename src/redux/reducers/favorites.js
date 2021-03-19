import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/types';

const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, payload.house],
      };

    case REMOVE_FAVORITE:
      return state.filter(house => house.id !== payload.houseId);

    default:
      return state;
  }
};

export default favoritesReducer;
