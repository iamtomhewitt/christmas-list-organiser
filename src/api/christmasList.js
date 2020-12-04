import { get, post, put } from '../util/http';

const url = 'http://localhost:8080/christmas-list';

export const saveChristmasList = (email, items, groups) => post(url, JSON.stringify({
  belongsTo: email,
  items,
  groups,
}));

export const getChristmasList = (email) => get(`${url}?email=${email}`);

export const getAllChristmasLists = () => get(`${url}/all`);

export const dibChristmasListItem = (itemName, listOwner, dibbedBy) => put(`${url}?listOwner=${listOwner}&itemName=${itemName}&dibbedBy=${dibbedBy}`);
