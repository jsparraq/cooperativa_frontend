import axios from 'axios';
import {
  returnErrors,
} from './messages';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
} from './types';

import {
  BACKEND_URL,
} from '../config/config';

// Setup config with token - helper function

export const tokenConfig = (getState) => {
  // Get token from state
  const {
    token,
  } = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // if token, add to headers config
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    if (getState().auth.user) {
      config.headers.userid = getState().auth.user._id;
    }
  }

  return config;
};

// LOGIN USER
export const login = (email, password) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({
    email,
    password,
  });

  await axios
    .post(`${BACKEND_URL}/login`, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const createUser = ({
  name,
  email,
  password,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({
    name,
    email,
    password,
  });

  axios
    .post(`${BACKEND_URL}/createUser`, body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  axios.get(`${BACKEND_URL}/validateUser`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
