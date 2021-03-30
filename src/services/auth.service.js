/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = 'https://findyourhouseapi.herokuapp.com/api/v1/';

const login = async (email, password) => {
  const response = await axios
    .post(`${API_URL}auth/login`, {
      email,
      password,
    });
  if (response.data.auth_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem('user');

const register = async (name, email, password, password_confirmation) => {
  const response = await axios
    .post(`${API_URL}/signup`, {
      name,
      email,
      password,
      password_confirmation,
    });
  if (response.data.auth_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
