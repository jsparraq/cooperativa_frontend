import axios from 'axios';
import {
  BACKEND_URL,
} from '../../config/config';

import {
  returnErrors,
  createMessage,
} from '../utils/messages';

import {
  GET_PARTNERS,
} from '../types';

import {
  tokenConfig,
} from '../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export const getPartnersNotAccepted = () => (dispatch, getState) => {
  axios
    .get(`${BACKEND_URL}/getPartnersNotAccepted`, tokenConfig(getState))
    .then((res) => {
      if (res.data.length === 0) {
        dispatch(createMessage({
          msg: 'There aren`t partners not accepted',
        }));
      } else {
        dispatch({
          type: GET_PARTNERS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
