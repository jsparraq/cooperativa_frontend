import axios from 'axios';
import {
  createMessage,
} from './messages';

import {
  GET_USERS,
  DELETE_USER,
  ADD_USER,
  GET_ERRORS,
} from './types';

const backendPath = process.env.REACT_APP_API_URL;

export const getUsers = () => (dispatch) => {
  axios
    .get(`${backendPath}/getUsers`)
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data.message,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// DELETE User
export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`${backendPath}/deleteUser/${id}`)
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
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// ADD User
export const addUser = (user) => (dispatch) => {
  axios
    .post(`${backendPath}/createUser`, user)
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
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};
