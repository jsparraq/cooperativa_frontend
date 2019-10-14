import axios from 'axios';

import {
  BACKEND_URL,
} from '../../config/config';

import {
  tokenConfig,
} from '../utils';

import {
  createMessage,
  returnErrors,
} from '../messages';

import {
  ACCEPT_PARTNER,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const acceptPartner = (user) => (dispatch, getState) => {
  axios.post(`${BACKEND_URL}/acceptPartner`, {
    userId: user,
  }, tokenConfig(getState)).then((res) => {
    dispatch(createMessage({
      msg: `Partner (${res.data.name}) accepted`,
    }));
    dispatch({
      type: ACCEPT_PARTNER,
      payload: {
        ...res.data,
        ...{
          _id: user,
        },
      },
    });
  }).catch((err) => {
    dispatch(returnErrors(err.response.data.message, err.response.status));
  });
};
