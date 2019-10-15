import {
  createMessage,
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  CREATE_NEWS,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const createNews = (text) => (dispatch, getState) => {
  instance
    .post('/createNews', {
      text,
    }, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({
        msg: 'News feed created',
      }));
      dispatch({
        type: CREATE_NEWS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
