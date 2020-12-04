const url = 'http://localhost:8080/group';

export const getGroups = () => fetch(`${url}/all`).then(((response) => response.json()));

export const createGroup = (name) => fetch(`${url}?name=${name}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response.json());

export const joinGroup = (email, name) => fetch(`${url}/join?email=${email}&name=${name}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response.json());

export const leaveGroup = (email, name) => fetch(`${url}/leave?email=${email}&name=${name}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response.json());
