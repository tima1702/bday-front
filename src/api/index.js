export function getBdaysList() {
    return fetch('https://bday-back.herokuapp.com/bdays', {
        method: 'GET',
    }).then(res => res.json()
    ).catch(err => err);
}

export function addBday(data) {
    return fetch('https://bday-back.herokuapp.com/bdays', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()
    ).catch(err => err);
}

export function deleteBday(id) {
    return fetch('https://bday-back.herokuapp.com/bdays/'+id, {
        method: 'DELETE',
    }).then(res => res.json()
    ).catch(err => err);
}

export function editBday(id,data) {
    return fetch('https://bday-back.herokuapp.com/bdays/'+id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()
    ).catch(err => err);
}

export function getTemplatesList() {
    return fetch('http://localhost:3001/templates', {
        method: 'GET',
    }).then(res => res.json()
    ).catch(err => err);
}

