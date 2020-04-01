import {createAction, createReducer} from '@reduxjs/toolkit';
import {getDefaultState, getDefaultHandler} from '../Utils/reduxTools';
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

export const calendarFetchTemplate = createAction('service/templates/fetchTemplate', id => ({
    payload: CalendarService.fetchTemplate(id),
}));

export const calendarEditTemplate = createAction('service/templates/edit', (id,data) => ({
    payload: CalendarService.editTemplate(id,data),
}));

export const calendarFetchTemplateWithBday = createAction('service/templates/fetchTemplateWithBday', (templateId,bdayId) => ({
    payload: CalendarService.getTemplateWithBday(templateId,bdayId),
}));

const initState = {
    list: getDefaultState(),
    add: getDefaultState(),
    delete: getDefaultState(),
    template: getDefaultState(),
    edit: getDefaultState(),
    templateWithBday: getDefaultState(),
};


export default createReducer(initState, {
    ...getDefaultHandler(calendarFetchListOfTemplates, 'list'),
    ...getDefaultHandler(calendarAddTemplate, 'add'),
    ...getDefaultHandler(calendarDeleteTemplate, 'delete'),
    ...getDefaultHandler(calendarFetchTemplate, 'template'),
    ...getDefaultHandler(calendarEditTemplate, 'edit'),
    ...getDefaultHandler(calendarFetchTemplateWithBday, 'templateWithBday'),
});
