import axios from "axios";

import {GET_USERS, DELETE_USER, ADD_USER} from './types';

const backendPath = process.env.REACT_APP_API_URL;

export const getUsers = () => dispatch => {
  axios
    .get(`${backendPath}/getUsers`)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE User
export const deleteUser = id => dispatch => {
  axios
    .delete(`${backendPath}/deleteUser/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD User
export const addUser = user => dispatch => {
  console.log(backendPath);
  axios
    .post(`${backendPath}/createUser`, user)
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};