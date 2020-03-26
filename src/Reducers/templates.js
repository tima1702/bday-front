import { createAction, createReducer } from '@reduxjs/toolkit';
import { getDefaultState, getDefaultHandler } from '../Utils/reduxTools';
import CalendarService from '../Services/CalendarService';

export const calendarFetchListsOfTemplates = createAction('service/templates/fetch', () => ({
    payload: CalendarService.fetchListOfTemplates(),
}));

export const calendarAddTemplate = createAction('service/templates/add', data => ({
    payload: CalendarService.addTemplate(data),
}));

const initState = {
    list: getDefaultState(),
    add: getDefaultState(),
};

export default createReducer(initState, {
    ...getDefaultHandler(calendarFetchListsOfTemplates, 'list'),
    ...getDefaultHandler(calendarAddTemplate, 'add'),
});
