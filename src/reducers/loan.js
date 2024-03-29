import {
  GET_LOANS,
  ACCEPT_LOANS,
  DENY_LOANS,
  GET_ONE_LOAN,
} from '../actions/types';

const initialState = {
  loans: [],
  loan: {
    amount: 0,
    totalAmount: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ONE_LOAN:
      return {
        loans: initialState.loans,
        loan: action.payload,
      };
    case GET_LOANS:
      return {
        loans: action.payload,
        loan: initialState.loan,
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
