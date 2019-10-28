import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export const createSavings = (bond, userId) => (dispatch, getState) => {
  instance
    .post(`/savings/${userId}`, {
      bond,
    }, tokenConfig(getState))
    .then(() => {
      dispatch(createMessage({
        msg: 'Savings has been paid',
      }));
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
