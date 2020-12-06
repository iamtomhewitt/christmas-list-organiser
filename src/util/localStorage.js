export const saveUserData = (user) => window.sessionStorage.setItem('user', JSON.stringify(user));

export const getUserData = () => JSON.parse(window.sessionStorage.getItem('user'));

export const clearUserData = () => window.sessionStorage.removeItem('user');
