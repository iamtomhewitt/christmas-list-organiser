// TODO make rest of methods return response.json()

const url = 'http://localhost:8080/christmas-list';

export const saveChristmasList = (email, items) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    belongsTo: email,
    items,
  }),
});

export const createChristmasList = (email) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    belongsTo: email,
    items: [{
      name: 'New Item',
      dibbed: false,
    }],
  }),
});

export const getChristmasList = (email) => fetch(`${url}?email=${email}`).then((response) => response.json());
export const getAllChristmasLists = () => fetch(`${url}/all`);

export const dibChristmasListItem = (itemName, listOwner, dibbedBy) => fetch(`${url}?listOwner=${listOwner}&itemName=${itemName}&dibbedBy=${dibbedBy}`, {
  method: 'PUT',
}).then((response) => response.json());
