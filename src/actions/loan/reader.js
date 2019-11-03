import {
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  GET_LOANS,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getLoansNotAccepted = () => (dispatch, getState) => {
  instance
    .get('/loan', {
      ...tokenConfig(getState),
      ...{
        params: {
          accepted: false,
        },
      },
    })
    .then((res) => {
      dispatch({
        type: GET_LOANS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};