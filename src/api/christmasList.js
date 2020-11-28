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
      dibbedBy: ' ',
      dibbed: false,
    }],
  }),
});

export const getChristmasList = (email) => fetch(`${url}?email=${email}`);

export const getAllChristmasLists = () => fetch(`${url}/all`);

export const dibChristmasListItem = (email, itemName, usersEmail) => fetch(`${url}?email=${email}&itemName=${itemName}&dibbedBy=${usersEmail}`, {
  method: 'PUT',
}).then((response) => response.json());
