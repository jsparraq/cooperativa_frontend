import {
  ADD_PARTNER,
} from '../types';

import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export const createPartner = (user) => (dispatch, getState) => {
  instance
    .post('/partner', user, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({
        msg: 'Partner created',
      }));
      dispatch({
        type: ADD_PARTNER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
