import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export const createFee = (payment, interest, penalty, admin, loanId) => (dispatch, getState) => {
  instance
    .post('/fee', {
      payment,
      interest,
      penalty,
      admin,
      loanId,
    }, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({
        msg: res.data.message,
      }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
