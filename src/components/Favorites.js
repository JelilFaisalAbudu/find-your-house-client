import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import houseImage from '../images/scott-webb-1ddol8rgUH8-unsplash.jpg';
import userFavorites from '../redux/actions/favorite';
import getHouses from '../redux/actions/houses';

const FavoritesHouses = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { favoriteHousesIds } = useSelector(state => state.favorites);
  const { houses } = useSelector(state => state.houses);

  const getUserFavorites = userId => {
    dispatch(userFavorites.getUserFavorites(userId));
  };
  const getFavoritesHouses = (houses, ids) => houses
    .filter(house => ids.includes(house.id));

  const handleRemoveFavorite = (userId = user.id, houseId) => {
    dispatch(userFavorites.removeUserFavorite(userId, houseId));
    dispatch(userFavorites.doRemoveFavorite(houseId));
  };

  useEffect(() => {
    dispatch(getHouses());
  }, []);

  useEffect(() => {
    if (user) {
      getUserFavorites(user.id);
    }
  }, []);

  const content = (
    getFavoritesHouses(houses, favoriteHousesIds).length
      ? (getFavoritesHouses(houses, favoriteHousesIds).map(house => (
        <div key={house.id} className="card mb-3">
          <img className="card-img-top" src={houseImage} alt={house.name} />
          <div className="card-body">
            <h5 className="card-title">{house.name}</h5>
            <h5 className="card-title">{house.category}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button
              type="button"
              className="card-text"
              onClick={() => handleRemoveFavorite(user.id, house.id)}
            >
              <small className="text-muted">unlike</small>
            </button>
          </div>
        </div>
      )))
      : (<div>You have no favorite house...</div>)
  );

  return (
    <div className="houses-container">
      {content}
    </div>
  );
};

export default FavoritesHouses;
