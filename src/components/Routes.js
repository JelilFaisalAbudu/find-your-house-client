import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Router,
  Switch,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';

import history from '../helpers/history';
import { logout } from '../redux/actions/auth';
import message from '../redux/actions/message';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Favorites from './Favorites';

import './Routes.css';
import SiteLogo from '../images/elcom1.png';

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
      <>
        <header className="site-header site-header--bg">
          <nav className="navbar navbar-expand-lg navbar-light py-0">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">
                <img src={SiteLogo} className="brand-logo img-fluid" alt="Elocom Homes Brand Logo" />
              </NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 align-items-baseline">
                  {currentUser ? (
                    <>
                      <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" aria-current="page" to="/home">
                          Home
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" aria-current="page" to="/Favorites">
                          Favorites
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          className="nav-link"
                          to="/logout"
                          onClick={logOut}
                        >
                          Sign out
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <NavLink activeClassName="active" className="nav-link" aria-current="page" to="/home">
                        Home
                      </NavLink>
                      <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/signin">Sign in</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/register">Sign up</NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main>
          <div className="components-wrapper">
            <Switch>
              <Route exact path={['/', '/home', '/logout']} component={Home} />
              <Route exact path="/signin" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/Favorites" component={Favorites} />
            </Switch>
          </div>
        </main>

        <footer className="footer">
          <div className="container-fluid footer-inner-wrapper">
            <p className="developed-by">
              Developed by
              <span className="name"> Jelil Abudu</span>
            </p>
            <div className="footer__social">
              <Link className="footer-icons" aria-label="github link" to="https://github.com/JelilFaisalAbudu" target="_blank" rel="noreferrer"><i className="fab fa-github" /></Link>
              <Link className="footer-icons" aria-label="linkedIn link" to="https://www.linkedin.com/in/jelilfaisalabudu/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in" /></Link>
              <Link className="footer-icons" aria-label="twitter link" to="https://twitter.com/jelilabudu" target="_blank" rel="noreferrer"><i className="fab fa-twitter" /></Link>
            </div>
            <div className="copyright">
              <span className="copyright__copy">&copy; 2021</span>
            </div>
          </div>
        </footer>
      </>
    </Router>
  );
};

export default Routes;
