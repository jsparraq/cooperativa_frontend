import axios from 'axios';
import {
  BACKEND_URL,
} from '../../config/config';

import {
  returnErrors,
} from '../messages';

import {
  GET_PARTNERS,
} from '../types';

import {
  tokenConfig,
} from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getPartnersNotAccepted = () => (dispatch, getState) => {
  axios
    .get(`${BACKEND_URL}/getPartnersNotAccepted`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PARTNERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
