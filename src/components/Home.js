/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import userService from '../services/user.service';

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [networkError, setError] = useState('');

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
          <p key={`house-${house.id}`}>
            <span>{house.name}</span>
            {' '}
            {' '}
            <span>{house.description}</span>
          </p>
        )))
        : (<div>Loading...</div>)
    );
  }

  return (
    <div className="container">
      {content}
    </div>
  );
};

export default Home;
