import {
  GET_LOANS,
  ACCEPT_LOANS,
  DENY_LOANS,
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
    case ACCEPT_LOANS:
    case DENY_LOANS:
      return {
        ...state,
        loans: state.loans.filter((loan) => loan._id !== action.payload._id),
      };
    default:
      return state;
  }
}
