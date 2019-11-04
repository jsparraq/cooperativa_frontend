import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  DENY_LOANS,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const denyLoan = (loanId) => (dispatch, getState) => {
  instance.delete(`/loan/${loanId}`, tokenConfig(getState)).then(() => {
    dispatch(createMessage({
      msg: 'Loan have been deleted',
    }));
    dispatch({
      type: DENY_LOANS,
      payload: {
        _id: loanId,
      },
    });
  }).catch((err) => {
    dispatch(returnErrors(err.response.data.message, err.response.status));
  });
};
