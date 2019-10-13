import {
  GET_PARTNERS,
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
    default:
      return state;
  }
}
