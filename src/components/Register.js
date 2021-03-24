/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* eslint-disable consistent-return */
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import history from '../helpers/history';

import { register } from '../redux/actions/auth';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeName = e => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = e => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordConfirm = e => {
    const password = e.target.value;
    setPasswordConfirm(password);
  };

  const handleRegister = e => {
    e.preventDefault();

    setLoading(true);
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name, email, password, passwordConfirm))
        .then(() => {
          setSuccessful(true);
          history.push('/home');
        })
        .catch(() => {
          setSuccessful(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirm">Password Confirmation</label>
                <Input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={onChangePasswordConfirm}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                  <span className="spinner-border spinner-border-sm" />
                  )}
                  <span className="signup-text">Sign Up</span>
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
