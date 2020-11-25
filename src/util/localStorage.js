export const saveUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserData = () => JSON.parse(localStorage.getItem('user'));
