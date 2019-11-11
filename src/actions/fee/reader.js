import {
  returnErrors,
  createMessage,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  GET_FEE,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getFee = (userId) => (dispatch, getState) => {
  instance
    .get(`/fee/${userId}`, tokenConfig(getState))
    .then((res) => {
      if (res.data.message !== undefined) {
        dispatch(
          createMessage({
            msg: res.data.message,
          }),
        );
        dispatch({
          type: GET_FEE,
          payload: {
            payment: 0,
            interest: 0,
            admin: 0,
            loanId: '',
          },
        });
      } else {
        dispatch({
          type: GET_FEE,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
