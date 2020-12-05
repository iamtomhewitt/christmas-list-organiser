import { get, post, put } from '../util/http';
import URL from '../config';

const url = `${URL}/group`;

export const getGroups = () => get(`${url}/all`);

export const createGroup = (name) => post(`${url}?name=${name}`);

export const joinGroup = (email, name) => put(`${url}/join?email=${email}&name=${name}`);

export const leaveGroup = (email, name) => put(`${url}/leave?email=${email}&name=${name}`);
