export const saveChristmasList = (email, items) => fetch('http://localhost:8080/christmas-list', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    belongsTo: email,
    items,
  }),
});

export const createChristmasList = (email) => fetch('http://localhost:8080/christmas-list', {
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

export const getChristmasList = (email) => fetch(`http://localhost:8080/christmas-list?email=${email}`);
export const getAllChristmasLists = () => fetch('http://localhost:8080/christmas-list/all');
