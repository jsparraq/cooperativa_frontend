import {
  CREATE_MESSAGE,
} from './types';

// CREATE MESSAGE
// eslint-disable-next-line import/prefer-default-export
export const createMessage = (msg) => ({
  type: CREATE_MESSAGE,
  payload: msg,
});
