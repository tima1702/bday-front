export function getBdaysList() {
    return fetch('http://localhost:3001/bdays', {
        method: 'GET',
    }).then(res => res.json()
    ).catch(err => err);
}

export function addBday(data) {
    return fetch('http://localhost:3001/bdays', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()
    ).catch(err => err);
}

export function deleteBday(id) {
    return fetch('http://localhost:3001/bdays/'+id, {
        method: 'DELETE',
    }).then(res => res.json()
    ).catch(err => err);
}

export function updateBday(id,data) {
    return fetch('http://localhost:3001/bdays/'+id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()
    ).catch(err => err);
}
