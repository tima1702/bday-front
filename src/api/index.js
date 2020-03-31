const defaultPath = process.env.REACT_APP_DEFAULT_PATH;

export function getBdaysList() {
    return fetch(defaultPath + '/bdays', {
        method: 'GET',
    }).then(res => res.json()
    ).catch(err => err);
}

export function addBday(data) {
    return fetch(defaultPath + '/bdays', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res
    ).catch(err => err);
}

export function deleteBday(id) {
    return fetch(defaultPath + '/bdays/' + id, {
        method: 'DELETE',
    }).then(res => res
    ).catch(err => err);
}

export function editBday(id, data) {
    return fetch(defaultPath + '/bdays/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res
    ).catch(err => err);
}

////////////////////////////////////////////////////////////////

export function getTemplatesList() {
    return fetch(defaultPath + '/templates', {
        method: 'GET',
    }).then(res => res.json()
    ).catch(err => err);
}

export function addTemplate(data) {
    return fetch(defaultPath + '/templates', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res
    ).catch(err => err);
}

export function deleteTemplate(id) {
    return fetch(defaultPath + '/templates/' + id, {
        method: 'DELETE',
    }).then(res => res
    ).catch(err => err);
}

export function getTemplate(id) {
    return fetch(defaultPath + '/templates/' + id, {
        method: 'GET',
    }).then(res => res.json()
    ).catch(err => err);
}

export function editTemplate(id, data) {
    return fetch(defaultPath + '/templates/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res
    ).catch(err => err);
}
