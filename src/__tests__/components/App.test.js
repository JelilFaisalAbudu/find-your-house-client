import React from 'react';
import { Provider } from 'react-redux';
// import { Link } from 'react-router-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setups/setupTests';
import App from '../../components/app/App';
import store from '../../redux/store';

const setup = () => mount(
  <Provider store={store}>
    <App />
  </Provider>,
);

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('displays a link tag with the login text', () => {
    const link = wrapper.find('NavLink')
      .find({ to: '/signin' }).text();

    expect(link).toMatch(/Sign in/i);
  });

  test('does not display a link tag with the logout text', () => {
    const link = wrapper.find('NavLink')
      .find({ to: '/logout' });

    expect(link.length).toEqual(0);
  });
});
