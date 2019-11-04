import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  ACCEPT_LOANS,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const acceptLoan = (loanId) => (dispatch, getState) => {
  instance.put(`/loan/${loanId}`, {}, tokenConfig(getState)).then(() => {
    dispatch(createMessage({
      msg: 'Loan have been accepted',
    }));
    dispatch({
      type: ACCEPT_LOANS,
      payload: {
        _id: loanId,
      },
    });
  }).catch((err) => {
    dispatch(returnErrors(err.response.data.message, err.response.status));
  });
};
