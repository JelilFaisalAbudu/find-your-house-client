/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import userService from '../services/user.service';
import houseImage from '../images/scott-webb-1ddol8rgUH8-unsplash.jpg';
import userFavorites from '../redux/actions/favorite';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [houses, setHouses] = useState([]);
  const [networkError, setError] = useState('');

  const handleAddFavorite = (userId, houseId) => {
    dispatch(userFavorites.addUserFavorite(userId, houseId));
  };

  useEffect(() => {
    userService.getPublicContent().then(
      response => {
        setHouses(response.data);
      },
      error => {
        const errorResponse = (error.response && error.response.data)
          || error.message
          || error.toString();

        setError(errorResponse);
      },
    );
  }, []);

  let content;

  if (networkError) {
    content = (
      <header className="jumbotron">
        <h4>{networkError}</h4>
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
              <button
                type="button"
                className="card-text"
                onClick={() => handleAddFavorite(user.id, house.id)}
              >
                <small className="text-muted">like</small>
              </button>
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
