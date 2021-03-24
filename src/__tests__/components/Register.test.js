import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setups/setupTests';
import Register from '../../components/Register';
import store from '../../redux/store';

const setup = () => mount(
  <Provider store={store}>
    <Register />
  </Provider>,
);

describe('', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = setup();
  });

  test('renders the Sign-up page without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('displays the sign-up for user to click', () => {
    const signUpText = wrapper.find('.signup-text').text();
    expect(signUpText).toMatch(/Sign Up/i);
  });
});
