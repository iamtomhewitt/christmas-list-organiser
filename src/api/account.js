import { get, post } from "../util/http";

const url = 'http://localhost:8080/account/';

export const getAccount = (email) => get(`${url}?email=${email}`);

export const validateAccount = (email, password) => get(`${url}validate?email=${email}&password=${password}`);

export const createAccount = (email, password, firstName, lastName) => post(url, JSON.stringify({
  email,
  password,
  firstName,
  lastName,
}));
