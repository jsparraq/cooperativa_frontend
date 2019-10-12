import {
  combineReducers,
} from 'redux';
import users from './users';
import messages from './messages';
import error from './errors';

export default combineReducers({
  users,
  messages,
  error,
});
