import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../setups/setupTests';
import Routes from '../../components/Routes';
import store from '../../redux/store';

const setup = () => mount(
  <Provider store={store}>
    <Routes />
  </Provider>,
);

describe('Routes/Navbar', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = setup();
  });

  test('renders the Sign-up page without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Unauthenticated User', () => {
    let navLinks;

    beforeAll(() => {
      navLinks = wrapper.find('Link');
    });

    test('does not display the logout link with text Logout', () => {
      expect(navLinks.find({ to: '/logout' }).length).toEqual(0);
    });

    test('renders the login-in link with text Login', () => {
      expect(navLinks.find({ to: '/login' }).text()).toMatch(/Login/i);
    });

    test('renders the sign-up link with text Signup', () => {
      expect(navLinks.find({ to: '/register' }).text()).toMatch(/Sign Up/i);
    });
  });

  describe('Authenticated User', () => {
    let navLinks;
    const user = {
      id: 4,
      name: 'John Doe',
      auth_token: 'doiifhfieiffhghwnc4429hBD',
    };

    const registerAction = user => ({
      type: 'REGISTER_SUCCESS',
      payload: { user },
    });

    beforeAll(() => {
      store.dispatch(registerAction(user));
      wrapper = setup();
      navLinks = wrapper.find('Link');
    });

    test('does not display the login link with text Login', () => {
      expect(navLinks.find({ to: '/login' }).length).toEqual(0);
    });

    test(' does not render the sign-up link with text Signup', () => {
      expect(navLinks.find({ to: '/register' }).length).toEqual(0);
    });

    test('renders the link to the user"s favorites ', () => {
      expect(navLinks.find({ to: '/Favorites' }).length).toEqual(1);
    });

    test('renders the nav link for the logged-in user to log out', () => {
      expect(navLinks.find({ to: '/logout' }).text()).toMatch(/Logout/i);
    });
  });
});
