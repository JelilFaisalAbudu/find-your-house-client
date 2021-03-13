import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'localhost:3000/api/v1/';

const getPublicContent = () => axios.get(`${API_URL}houses`);

const getUserboard = () => axios.get(`${API_URL}user`, { headers: authHeader() });

const getUserFavorites = userId => (
  axios.get(`${API_URL}users/${userId}/favorites`, { headers: authHeader() })
);

const userServices = {
  getPublicContent,
  getUserboard,
  getUserFavorites,
};

export default userServices;
