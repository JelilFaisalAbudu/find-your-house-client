import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setups/setupTests';
import Login from '../../components/Login';
import store from '../../redux/store';

const setup = () => mount(
  <Provider store={store}>
    <Login />
  </Provider>,
);

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('renders the login form correctly', async () => {
    const button = await wrapper.find('button.btn-login');
    expect(button.length).toEqual(1);
  });
});
