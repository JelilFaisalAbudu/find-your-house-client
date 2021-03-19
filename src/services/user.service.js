import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/api/v1/';

const getPublicContent = () => axios.get(`${API_URL}houses`);

const getUserboard = userId => (
  axios.get(`${API_URL}users/${userId}/favorites`, { headers: authHeader() })
);

const getUserFavorite = userId => (
  axios.get(`${API_URL}users/${userId}/favorites`, { headers: authHeader() })
);

const addUserFavorite = async (userId, houseId) => {
  const response = await axios
    .post(`${API_URL}users/${userId}/favorites`,
      { house_id: houseId },
      { headers: authHeader() });

  return response.data;
};

const removeUserFavorite = (userId, favoriteId) => {
  axios.delete(`${API_URL}users/${userId}/favorites/${favoriteId}`, { headers: authHeader() });
};

const userServices = {
  getPublicContent,
  getUserboard,
  getUserFavorite,
  addUserFavorite,
  removeUserFavorite,
};

export default userServices;
