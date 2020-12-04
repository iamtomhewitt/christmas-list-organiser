export const get = (url) => fetch(url).then(((response) => response.json()))

export const post = (url, body) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: body || {}
}).then(((response) => response.json()))

export const put = (url) => fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
}).then(((response) => response.json()))