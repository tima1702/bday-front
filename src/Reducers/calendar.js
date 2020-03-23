import { createAction, createReducer } from '@reduxjs/toolkit';
import { getDefaultState, getDefaultHandler } from '../Utils/reduxTools';
import CalendarService from '../Services/CalendarService';

export const calendarFetchList = createAction('service/fetch', id => ({
  payload: CalendarService.fetchList(),
}));

export const calendarDeleteBday = createAction('service/delete', id => ({
  payload: CalendarService.deleteBday(id),
}));

const initState = {
  list: getDefaultState(),
  delete: getDefaultState(),
};

export default createReducer(initState, {
  ...getDefaultHandler(calendarFetchList, 'list'),
  ...getDefaultHandler(calendarDeleteBday, 'delete'),
});
