import {
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  GET_LOANS,
  GET_ONE_LOAN,
} from '../types';

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

export const getLoan = (loanId) => (dispatch, getState) => {
  if (loanId !== '') {
    instance.get(`/loan/${loanId}`, tokenConfig(getState)).then((res) => {
      dispatch({
        type: GET_ONE_LOAN,
        payload: res.data,
      });
    }).catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
  }
};
