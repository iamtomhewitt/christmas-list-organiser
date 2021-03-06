import { get, post, put } from '../util/http';
import URL from '../config';

const url = `${URL}/christmas-list`;

export const saveChristmasList = (belongsTo, items, groups) => post(url, JSON.stringify({
  belongsTo,
  items,
  groups,
}));

export const getChristmasList = (email) => get(`${url}?email=${email}`);

export const getAllChristmasLists = () => get(`${url}/all`);

export const dibChristmasListItem = (itemName, listOwner, dibbedBy) => put(`${url}?listOwner=${listOwner}&itemName=${itemName}&dibbedBy=${dibbedBy}`);
