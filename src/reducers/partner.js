import {
  GET_PARTNERS,
  DENY_PARTNER,
  ACCEPT_PARTNER,
  GET_PARTNERS_ACCEPTED,
} from '../actions/types';

const initialState = {
  partners: [],
  partnersAccepted: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS_ACCEPTED:
      return {
        ...state,
        partnersAccepted: action.payload,
      };
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
