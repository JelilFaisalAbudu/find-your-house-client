/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../helpers/history';
import { spyHeaderScroll } from '../helpers/dom';

import houseImage from '../images/scott-webb-1ddol8rgUH8-unsplash.jpg';
import userFavorites from '../redux/actions/favorite';
import getHouses from '../redux/actions/houses';
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(false);
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

  const changeRoute = (path = '/sigin') => history.replace(`${path}`);

  const displayFavoriteBtn = houseId => {
    if (isLoggedIn && favoriteHousesIds.includes(houseId)) {
      return (
        <button
          type="button"
          aria-label="Remove from favorite list"
          className="btn btn-unlike"
          data-toggle="tooltip"
          data-placement="top"
          title="remove from favorite list"
          onClick={() => handleRemoveFavorite(user.id, houseId)}
        >
          <span className="material-icons">
            favorite
          </span>
        </button>
      );
    }

    return (
      <button
        type="button"
        aria-label="Add to favorite list"
        className="btn btn-like"
        data-toggle="tooltip"
        data-placement="top"
        title="add to favorite list"
        onClick={() => {
          if (!isLoggedIn) {
            return changeRoute('/signin');
          }
          return handleAddFavorite(user.id, houseId);
        }}
      >
        <span className="material-icons">
          favorite
        </span>
      </button>
    );
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getHouses());
    setLoading(false);
    spyHeaderScroll(400);
  }, [spyHeaderScroll]);

  useEffect(() => {
    if (user) {
      getUserFavorites(user.id);
    }
  }, []);

  let content;

  if (networkErrorMessage) {
    content = (
      <header className="jumbotron">
        <h4>{networkErrorMessage}</h4>
      </header>
    );
  } else {
    content = (

      <>
        <div className="hero position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
          <div className="hero-text col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 fw-normal">Punny headline</h1>
            <p className="lead fw-normal">A landing page to boot. Jumpstart your marketing efforts with this example based on  marketing pages.</p>
            <a className="btn btn-outline-secondary" to="#">Coming soon</a>
          </div>
        </div>

        <div className="container-fluid">
          <div className="houses-container py-2 py-md-4 row g-3">
            {houses.length
              && (houses.map(house => (
                <div key={house.id} className="house col-12 col-lg-6 col-xlg-4 text-white position-relative">
                  {displayFavoriteBtn(house.id)}
                  <div className="house-info">
                    <h2 className="display-6">{house.name}</h2>
                    <h3 className="display-7">{house.category}</h3>
                    <p className="lead">And an even wittier subheading.</p>
                  </div>
                  <img
                    className="img-fluid"
                    src={houseImage}
                    alt={house.name}
                  />
                </div>

              )))}
          </div>
        </div>

      </>
    );
  }

  return loading ? <div>Loading...</div> : content;
};

export default Home;
