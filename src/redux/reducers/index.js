import { combineReducers } from 'redux';
import authReducer from './auth';
import messageReducer from './message';
import housesReducer from './houses';
import preloaderReducer from './preloader';
import favoritesReducer from './favorites';

const rootReducer = combineReducers({
  loading: preloaderReducer,
  houses: housesReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  message: messageReducer,
});

export default rootReducer;
