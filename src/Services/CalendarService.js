import {
    getBdaysList,
    deleteBday,
    addBday,
    editBday,
    getTemplatesList,
    addTemplate,
    deleteTemplate, getTemplate, editTemplate, getTemplateWithBday,
} from "../api";

class CalendarService {
    fetchListOfBdays() {
        return getBdaysList().then(res => res.data);
    }

    deleteBday(id) {
        return deleteBday(id).then(res => res);
    }

    addBday(data) {
        return addBday(data).then(res => res);
    }

    editBday(id, data) {
        return editBday(id, data).then(res => res);
    }

    ///////////

    fetchListOfTemplates() {
        return getTemplatesList().then(res => res.data);
    }

    addTemplate(data) {
        return addTemplate(data).then(res => res);
    }

    deleteTemplate(id) {
        return deleteTemplate(id).then(res => res);
    }
    fetchTemplate(id) {
        return getTemplate(id).then(res => res.data);
    }
    editTemplate(id, data) {
        return editTemplate(id, data).then(res => res);
    }

    getTemplateWithBday(templateId,bdayId) {
        return getTemplateWithBday(templateId,bdayId).then(res => res.data);
    }
}

export default new CalendarService();
