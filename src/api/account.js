const url = 'http://localhost:8080/account/';

export const getAccount = (email) => fetch(`${url}?email=${email}`).then(((response) => response.json()));

export const validateAccount = (email, password) => fetch(`${url}validate?email=${email}&password=${password}`).then(((response) => response.json()));

export const createAccount = (email, password, firstName, lastName) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email,
    password,
    firstName,
    lastName,
  }),
}).then(((response) => response.json()));
