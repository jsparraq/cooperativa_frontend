import {
  CREATE_NEWS,
  GET_NEWS,
} from '../actions/types';

const initialState = {
  news: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_NEWS:
      return {
        ...state,
        news: [action.payload].concat(state.news),
      };
    case GET_NEWS:
      return {
        news: action.payload,
      };
    default:
      return state;
  }
}
