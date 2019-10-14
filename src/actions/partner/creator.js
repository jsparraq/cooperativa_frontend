import axios from 'axios';
import {
  BACKEND_URL,
} from '../../config/config';

import {
  ADD_PARTNER,
} from '../types';

import {
  createMessage,
  returnErrors,
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
        type: ADD_PARTNER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
