import { combineReducers } from '@reduxjs/toolkit';
import calendar from './calendar';
import templates from './templates';

export default combineReducers({
  calendar,
  templates,
});
