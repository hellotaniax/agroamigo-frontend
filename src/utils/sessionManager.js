export const clearSession = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
