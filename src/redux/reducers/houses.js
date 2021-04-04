import { GET_HOUSES } from '../actions/types';

const initialState = {
  houses: [],
};
const housesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_HOUSES:
      return {
        ...state,
        houses: payload.houses,
      };

    default:
      return state;
  }
};

export default housesReducer;
