// TODO make rest of methods return response.json()
// TODO make api files use a base method gor gets posts and puts instead of writing out the method and headers everytime

const url = 'http://localhost:8080/christmas-list';

export const saveChristmasList = (email, items, groups) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    belongsTo: email,
    items,
    groups,
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
    groups: [],
  }),
});

export const getChristmasList = (email) => fetch(`${url}?email=${email}`).then((response) => response.json());

export const getAllChristmasLists = () => fetch(`${url}/all`);

export const dibChristmasListItem = (itemName, listOwner, dibbedBy) => fetch(`${url}?listOwner=${listOwner}&itemName=${itemName}&dibbedBy=${dibbedBy}`, {
  method: 'PUT',
}).then((response) => response.json());
