import {
  returnErrors,
  createMessage,
} from '../utils/messages';

import {
  GET_PARTNERS,
  GET_PARTNERS_ACCEPTED,
} from '../types';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

export const getPartnersNotAccepted = () => (dispatch, getState) => {
  instance
    .get('/getPartnersNotAccepted', tokenConfig(getState))
    .then((res) => {
      if (res.data.length === 0) {
        dispatch(createMessage({
          msg: 'There aren`t partners not accepted',
        }));
      } else {
        dispatch({
          type: GET_PARTNERS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};

export const getPartners = () => (dispatch, getState) => {
  instance
    .get('/getPartners', tokenConfig(getState))
    .then((res) => {
      if (res.data.length === 0) {
        dispatch(createMessage({
          msg: 'There aren`t partners accepted',
        }));
      } else {
        dispatch({
          type: GET_PARTNERS_ACCEPTED,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
