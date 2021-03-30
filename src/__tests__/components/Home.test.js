import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setups/setupTests';
import Home from '../../components/Home';
import store from '../../redux/store';

const setup = () => mount(
  <Provider store={store}>
    <Home />
  </Provider>,
);

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    // console.log(toJson(wrapper));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('', () => {
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
    ];
    const action = houses => ({
      type: 'GET_HOUSES',
      payload: { houses },
    });

    beforeAll(() => {
      store.dispatch(action(houses));
    });

    test('renders the Home form correctly', async () => {
      const renderedHouses = await wrapper.find('.houses-container').children();
      expect(renderedHouses.length).toEqual(houses.length);
    });
  });
});
