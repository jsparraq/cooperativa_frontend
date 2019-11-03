import {
  GET_LOANS,
} from '../actions/types';

const initialState = {
  loans: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOANS:
      return {
        loans: action.payload,
      };
    default:
      return state;
  }
}
