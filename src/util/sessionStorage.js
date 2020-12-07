export const saveLoggedInUser = (user) => window.sessionStorage.setItem('user', JSON.stringify(user));

export const getLoggedInUser = () => JSON.parse(window.sessionStorage.getItem('user'));

export const clearLoggedInUser = () => window.sessionStorage.removeItem('user');
