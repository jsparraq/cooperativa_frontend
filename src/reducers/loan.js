import {
  GET_LOANS,
  ACCEPT_LOANS,
  DENY_LOANS,
  GET_LOAN,
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
    case GET_LOAN:
      return {
        loans: [],
        loan: action.payload,
      };
    case GET_LOANS:
      return {
        loans: action.payload,
        loan: {
          amount: 0,
          totalAmount: 0,
        },
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
