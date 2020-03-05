import { createAction, createReducer } from '@reduxjs/toolkit';
import { getDefaultState, getDefaultHandler } from '../Utils/reduxTools';
import CalendarService from '../Services/CalendarService';

export const calendarFetchList = createAction('service/general', id => ({
  payload: CalendarService.list(),
}));


const initState = {
  list: getDefaultState(),
};

export default createReducer(initState, {
  ...getDefaultHandler(calendarFetchList, 'list'),
});
