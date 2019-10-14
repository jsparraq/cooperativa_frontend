import {
  GET_PARTNERS,
  DENY_PARTNER,
  ACCEPT_PARTNER,
} from '../actions/types';

const initialState = {
  partners: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS:
      return {
        ...state,
        partners: action.payload,
      };
    case ACCEPT_PARTNER:
    case DENY_PARTNER:
      return {
        ...state,
        partners: state.partners.filter((partner) => partner._id !== action.payload._id),
      };
    default:
      return state;
  }
}
