import axios from 'axios';
import {
  BACKEND_URL,
} from '../../config/config';

import {
  ADD_USER,
  GET_ERRORS,
} from '../types';

import {
  createMessage,
} from '../messages';

import {
  tokenConfig,
} from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const createPartner = (user) => (dispatch, getState) => {
  axios
    .post(`${BACKEND_URL}/createPartner`, user, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({
        msg: 'Partner created',
      }));
      dispatch({
        type: ADD_USER,
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
