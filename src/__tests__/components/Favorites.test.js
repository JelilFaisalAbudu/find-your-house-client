import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../setups/setupTests';
import Favorites from '../../components/Favorites';
import store from '../../redux/store';

const setup = () => mount(
  <Provider store={store}>
    <Favorites />
  </Provider>,
);

describe('Favorites', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    // console.log(toJson(wrapper));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('', () => {
    const user = {
      id: 4,
      name: 'John Doe',
      auth_token: 'doiifhfieiffhghwnc4429hBD',
    };
    const houses = [
      {
        id: 1,
        name: 'Golden Lu',
        category: 'Glass House',
        description: 'Lorem Ipsum',
        imageUrl: 'http://example.com/golden-lu.jpg',
      },
      {
        id: 2,
        name: 'Golden Lu',
        category: 'Glass House',
        description: 'Lorem Ipsum',
        imageUrl: 'http://example.com/golden-lu.jpg',
      },
      {
        id: 3,
        name: 'Golden Lu',
        category: 'Glass House',
        description: 'Lorem Ipsum',
        imageUrl: 'http://example.com/golden-lu.jpg',
      },
    ];

    const loginUserAction = user => ({
      type: 'LOGIN_SUCCESS',
      payload: { user },
    });

    const addHouses = houses => ({
      type: 'GET_HOUSES',
      payload: { houses },
    });

    const addFavoriteAction = house => ({
      type: 'ADD_FAVORITE',
      payload: { house },
    });

    beforeAll(() => {
      store.dispatch(addHouses(houses));
      store.dispatch(loginUserAction(user));
    });

    test('renders the Favorites page correctly but with no favorite house', async () => {
      const favoriteHouses = await wrapper
        .find('div.houses-container');
      expect(favoriteHouses.text()).toMatch(/You have no favorite house.../i);
    });

    test('should add a new favorite house for the user', () => {
      const { auth, houses, favorites } = store.getState();
      const newFavorite = {
        user_id: auth.user.id,
        house_id: houses.houses[2],
      };
      store.dispatch(addFavoriteAction(newFavorite));

      const newFavoritesState = store.getState().favorites;

      expect(newFavoritesState.favoriteHouses.length)
        .toBeGreaterThan(favorites.favoriteHouses.length);
    });
  });
});
