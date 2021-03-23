import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../helpers/history';

import houseImage from '../images/scott-webb-1ddol8rgUH8-unsplash.jpg';
import userFavorites from '../redux/actions/favorite';
import getHouses from '../redux/actions/houses';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { favoriteHousesIds } = useSelector(state => state.favorites);
  const { houses } = useSelector(state => state.houses);
  const { networkErrorMessage } = useSelector(state => state.message);

  const getUserFavorites = userId => {
    dispatch(userFavorites.getUserFavorites(userId));
  };

  const handleAddFavorite = (userId, houseId) => {
    dispatch(userFavorites.addUserFavorite(userId, houseId));
  };

  const handleRemoveFavorite = (userId, houseId) => {
    dispatch(userFavorites.removeUserFavorite(userId, houseId));
    dispatch(userFavorites.doRemoveFavorite(houseId));
  };

  const changeRoute = (path = '/login') => history.replace(`${path}`);

  useEffect(() => {
    dispatch(getHouses());
  }, []);

  useEffect(() => {
    if (user) {
      getUserFavorites(user.id);
    }
  }, []);

  const displayFavoriteBtn = houseId => {
    if (favoriteHousesIds.includes(houseId)) {
      return (
        <button
          type="button"
          className="card-text"
          onClick={() => handleRemoveFavorite(user.id, houseId)}
        >
          <small className="text-muted">unlike</small>
        </button>
      );
    }

    return (
      <button
        type="button"
        className="card-text"
        onClick={() => {
          if (!isLoggedIn) {
            return changeRoute('/login');
          }
          return handleAddFavorite(user.id, houseId);
        }}
      >
        <small className="text-muted">like</small>
      </button>
    );
  };

  let content;

  if (networkErrorMessage) {
    content = (
      <header className="jumbotron">
        <h4>{networkErrorMessage}</h4>
      </header>
    );
  } else {
    content = (
      houses.length
        ? (houses.map(house => (
          <div key={house.id} className="card mb-3">
            <img className="card-img-top" src={houseImage} alt={house.name} />
            <div className="card-body">
              <h5 className="card-title">{house.name}</h5>
              <h5 className="card-title">{house.category}</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              {displayFavoriteBtn(house.id)}
            </div>
          </div>
        )))
        : (<div>Loading...</div>)
    );
  }

  return (
    <div className="">
      {content}
    </div>
  );
};

export default Home;
