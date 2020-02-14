import {combineReducers} from 'redux';
import todosReducer from './TodosReducer';

import user from './user';

export default combineReducers({
  user,
  todosReducer,
});
