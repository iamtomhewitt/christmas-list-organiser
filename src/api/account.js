import { get, post } from '../util/http';
import URL from '../config';

const host = process.env.BACKEND_URL || 'http://localhost:8080'
const url = `${host}/account`;

export const getAccount = (email) => get(`${url}?email=${email}`);

export const validateAccount = (email, password) => get(`${url}/validate?email=${email}&password=${password}`);

export const createAccount = (email, password, firstName, lastName) => post(url, JSON.stringify({
  email,
  password,
  firstName,
  lastName,
}));
