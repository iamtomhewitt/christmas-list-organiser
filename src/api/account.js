import { get, post } from '../util/http';
import URL from '../config';

console.log('env', process.env.BACKEND_URL)
const host = process.env.BACKEND_URL || 'http://localhost:8080'
console.log('Host', host)
const url = `${host}/account`;
console.log('url', url)

export const getAccount = (email) => get(`${url}?email=${email}`);

export const validateAccount = (email, password) => get(`${url}/validate?email=${email}&password=${password}`);

export const createAccount = (email, password, firstName, lastName) => post(url, JSON.stringify({
  email,
  password,
  firstName,
  lastName,
}));
