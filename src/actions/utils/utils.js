import axios from 'axios';

import {
  BACKEND_URL,
} from '../../config/config';

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

export const instance = axios.create({
  baseURL: BACKEND_URL,
});
