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
  DENY_PARTNER,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const denyPartner = (user) => (dispatch, getState) => {
  axios.post(`${BACKEND_URL}/denyPartner`, {
    userId: user,
  }, tokenConfig(getState)).then((res) => {
    dispatch(createMessage({
      msg: `Partner (${res.data.name}) have been deleted`,
    }));
    dispatch({
      type: DENY_PARTNER,
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
