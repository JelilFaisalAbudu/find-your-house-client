import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import houseImage from '../images/scott-webb-1ddol8rgUH8-unsplash.jpg';
import userFavorites from '../redux/actions/favorite';
import getHouses from '../redux/actions/houses';
import { spyNoScroll } from '../helpers/dom';

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
    spyNoScroll();
  }, []);

  useEffect(() => {
    if (user) {
      getUserFavorites(user.id);
    }
  }, []);

  const content = (

    <div className="container-fluid">
      <div className="favorite-houses row g-2">
        {getFavoritesHouses(houses, favoriteHousesIds).length
          ? (getFavoritesHouses(houses, favoriteHousesIds).map(house => (
            <div key={house.id} className="house col-12 col-lg-6 col-xlg-4 text-white position-relative">
              <button
                type="button"
                aria-label="Remove from favorite list"
                className="btn btn-unlike"
                data-toggle="tooltip"
                data-placement="top"
                title="remove from favorite list"
                onClick={() => handleRemoveFavorite(user.id, house.id)}
              >
                <span className="material-icons">
                  favorite
                </span>
              </button>
              <div className="house-info">
                <h2 className="display-5">{house.name}</h2>
                <h2 className="display-5">{house.category}</h2>
                <p className="lead">And an even wittier subheading.</p>
              </div>
              <img
                className="img-fluid"
                src={houseImage}
                alt={house.name}
              />
            </div>

          )))
          : (<div className="col-12">You have no favorite house...</div>)}
      </div>
    </div>

  );

  return content;
};

export default FavoritesHouses;
