/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = 'http:// localhost:3000/api/v1/';

const login = (email, password) => axios
  .post(`${API_URL}auth/login`, {
    email,
    password,
  })
  .then(response => {
    if (response.data.auth_token) {
      localStorage.setItem('user', JSON.stringify(response.data.auth_token));
    }
    return response.data;
  });

const logout = () => localStorage.removeItem('user');

const register = (name, email, password, password_confirmation) => axios.post(`${API_URL}signup`, {
  name,
  email,
  password,
  password_confirmation,
});

const authService = {
  login,
  register,
  logout,
};

export default authService;
