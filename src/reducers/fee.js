import {
  GET_FEE,
} from '../actions/types';

const initialState = {
  fee: {
    payment: 0,
    interest: 0,
    admin: 0,
    loanId: '',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEE:
      return {
        fee: action.payload,
      };
    default:
      return state;
  }
}
