import {
  returnErrors,
} from './utils/messages';

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
  tokenConfig,
  instance,
} from './utils/utils';


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

  await instance
    .post('/login', body, config)
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

  instance
    .post('/partner', body, config)
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
  instance.get('/token', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }).catch(() => {
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
