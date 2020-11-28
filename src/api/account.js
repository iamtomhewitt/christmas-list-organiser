export const validateAccount = (email, password) => fetch(`http://localhost:8080/account/validate?email=${email}&password=${password}`);

export const createAccount = (email, password, firstName, lastName) => fetch('http://localhost:8080/account', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email,
    password,
    firstName,
    lastName,
  }),
});
