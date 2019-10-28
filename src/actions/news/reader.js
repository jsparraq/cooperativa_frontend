import {
  returnErrors,
} from '../utils/messages';

import {
  tokenConfig,
  instance,
} from '../utils/utils';

import {
  GET_NEWS,
} from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getNews = () => (dispatch, getState) => {
  instance
    .get('/news', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_NEWS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.message, err.response.status));
    });
};
