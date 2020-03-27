import { createAction, createReducer } from '@reduxjs/toolkit';
import { getDefaultState, getDefaultHandler } from '../Utils/reduxTools';
import CalendarService from '../Services/CalendarService';

export const calendarFetchListOfTemplates = createAction('service/templates/fetch', () => ({
    payload: CalendarService.fetchListOfTemplates(),
}));

export const calendarAddTemplate = createAction('service/templates/add', data => ({
    payload: CalendarService.addTemplate(data),
}));

export const calendarDeleteTemplate = createAction('service/templates/delete', id => ({
    payload: CalendarService.deleteTemplate(id),
}));

const initState = {
    list: getDefaultState(),
    add: getDefaultState(),
    delete: getDefaultState(),
};

export default createReducer(initState, {
    ...getDefaultHandler(calendarFetchListOfTemplates, 'list'),
    ...getDefaultHandler(calendarAddTemplate, 'add'),
    ...getDefaultHandler(calendarDeleteTemplate, 'delete'),
});
