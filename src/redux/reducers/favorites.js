import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/types';

const initialState = {
  favoriteHouses: [],
  favoriteHousesIds: [],
};

const favoritesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favoriteHouses: [...state.favoriteHouses, payload.house],
        favoriteHousesIds: [...state.favoriteHousesIds, payload.house.id],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favoriteHouses: state.favoriteHouses
          .filter(house => house.id !== payload.houseId),

        favoriteHousesIds: state.favoriteHousesIds
          .filter(houseId => houseId !== payload.houseId),
      };

    default:
      return state;
  }
};

export default favoritesReducer;
