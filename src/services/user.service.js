import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://findyourhouseapi.herokuapp.com/api/v1/';

const getPublicContent = () => axios.get(`${API_URL}houses`);

const getUserboard = userId => (
  axios.get(`${API_URL}users/${userId}/favorites`, { headers: authHeader() })
);

const getUserFavorites = async userId => {
  const response = await axios
    .get(`${API_URL}users/${userId}/favorites`,
      { headers: authHeader() });

  return response.data;
};

const addUserFavorite = async (userId, houseId) => {
  const response = await axios
    .post(`${API_URL}users/${userId}/favorites`,
      { house_id: houseId },
      { headers: authHeader() });

  return response.data;
};

const removeUserFavorite = async (userId, houseId) => {
  const favorites = await getUserFavorites(userId);
  const favorite = favorites.find(favorite => favorite.house_id === houseId);
  const response = await axios({
    method: 'delete',
    url: `${API_URL}users/${userId}/favorites/${favorite.id}`,
    headers: authHeader(),
  });

  return response.data;
};

const userServices = {
  getPublicContent,
  getUserboard,
  getUserFavorites,
  addUserFavorite,
  removeUserFavorite,
};

export default userServices;
