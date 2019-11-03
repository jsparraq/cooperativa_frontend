import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  CREATE_LOANS,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const createLoans = (userId, month, year, amount) => (dispatch, getState) => {
  instance
    .post(`/loan/${userId}`, {
      year,
      month,
      amount,
    }, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({
        msg: 'Loan requested',
      }));
      dispatch({
        type: CREATE_LOANS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
