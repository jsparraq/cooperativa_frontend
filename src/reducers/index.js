import {
  combineReducers,
} from 'redux';
import messages from './messages';
import error from './errors';
import auth from './auth';
import partners from './partner';
import news from './news';
import loan from './loan';
import fee from './fee';

export default combineReducers({
  messages,
  error,
  auth,
  partners,
  news,
  loan,
  fee,
});
