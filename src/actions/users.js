import axios from 'axios';
import {
  createMessage,
  returnErrors,
} from './messages';

import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
} from './types';

import {
  BACKEND_URL,
} from '../config/config';

import {
  tokenConfig,
} from './utils';

export const getUsers = () => (dispatch, getState) => {
  axios
    .get(`${BACKEND_URL}/getUsers`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};

// DELETE User
export const deleteUser = (id) => (dispatch, getState) => {
  axios
    .delete(`${BACKEND_URL}/deleteUser/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch(createMessage({
        msg: 'User Deleted',
      }));
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};

// ADD User
export const addUser = (user) => (dispatch, getState) => {
  axios
    .post(`${BACKEND_URL}/createUser`, user, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({
        msg: 'User Added',
      }));
      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
