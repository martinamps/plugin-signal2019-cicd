import { combineReducers } from 'redux';

import { reduce as CustomTaskListReducer } from './CustomTaskListState';

// Register your redux store under a unique namespace
export const namespace = 'signal-demo-test';

// Combine the reducers
export default combineReducers({
  customTaskList: CustomTaskListReducer
});
