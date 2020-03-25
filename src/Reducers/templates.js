import { createAction, createReducer } from '@reduxjs/toolkit';
import { getDefaultState, getDefaultHandler } from '../Utils/reduxTools';
import CalendarService from '../Services/CalendarService';

export const calendarFetchListsOfTemplates = createAction('service/templates/fetch', () => ({
    payload: CalendarService.fetchListOfTemplates(),
}));

const initState = {
    list: getDefaultState(),
};

export default createReducer(initState, {
    ...getDefaultHandler(calendarFetchListsOfTemplates, 'list'),
});
