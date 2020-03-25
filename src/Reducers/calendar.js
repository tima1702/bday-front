import { createAction, createReducer } from '@reduxjs/toolkit';
import { getDefaultState, getDefaultHandler } from '../Utils/reduxTools';
import CalendarService from '../Services/CalendarService';

export const calendarFetchList = createAction('service/fetch', () => ({
  payload: CalendarService.fetchList(),
}));

export const calendarDeleteBday = createAction('service/delete', id => ({
  payload: CalendarService.deleteBday(id),
}));

export const calendarAddBday = createAction('service/add', data => ({
  payload: CalendarService.addBday(data),
}));

export const calendarEditBday = createAction('service/edit', (id,data) => ({
  payload: CalendarService.editBday(id,data),
}));

const initState = {
  list: getDefaultState(),
  delete: getDefaultState(),
  add: getDefaultState(),
  edit: getDefaultState(),
};

export default createReducer(initState, {
  ...getDefaultHandler(calendarFetchList, 'list'),
  ...getDefaultHandler(calendarDeleteBday, 'delete'),
  ...getDefaultHandler(calendarAddBday, 'add'),
  ...getDefaultHandler(calendarEditBday, 'edit'),
});
