import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  ACCEPT_PARTNER,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const acceptPartner = (user) => (dispatch, getState) => {
  instance.post('/acceptPartner', {
    userId: user,
  }, tokenConfig(getState)).then((res) => {
    dispatch(createMessage({
      msg: `Partner (${res.data.name}) have been accepted`,
    }));
    dispatch({
      type: ACCEPT_PARTNER,
      payload: {
        ...res.data,
        ...{
          _id: user,
        },
      },
    });
  }).catch((err) => {
    dispatch(returnErrors(err.response.data.message, err.response.status));
  });
};
