/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import history from '../helpers/history';
import { logout } from '../redux/actions/auth';
import message from '../redux/actions/message';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Favorites from './Favorites';
import BoardUser from './BoardUser';

const Routes = () => {
  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      dispatch(message.clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            NavBar Brand
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/Favorites" className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link" onClick={logOut}>
                  LogOut
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={['/', '/home', '/logout']} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/Favorites" component={Favorites} />
            <Route path="/user" component={BoardUser} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
