import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  DENY_PARTNER,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const denyPartner = (user) => (dispatch, getState) => {
  instance.delete(`/partner/${user}`, tokenConfig(getState)).then((res) => {
    dispatch(createMessage({
      msg: `Partner (${res.data.name}) have been deleted`,
    }));
    dispatch({
      type: DENY_PARTNER,
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
