import { GET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/types';

const initialState = {
  favoriteHouses: [],
  favoriteHousesIds: [],
};

const favoritesHousesIds = favorites => favorites
  .map(favorite => favorite.house_id);

const favoritesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FAVORITES:
      return {
        ...state,
        favoriteHouses: payload.favorites,
        favoriteHousesIds: favoritesHousesIds(payload.favorites),
      };
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
          .filter(house => house.house_id !== payload.houseId),

        favoriteHousesIds: state.favoriteHousesIds
          .filter(houseId => houseId !== payload.houseId),
      };

    default:
      return state;
  }
};

export default favoritesReducer;
