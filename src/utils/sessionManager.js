export const clearSession = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('user');
  try {
    window.dispatchEvent(new Event('sessionChanged'));
  } catch (e) {
    /* noop for non-browser environments */
  }
};

export const saveSession = ({ token, user }, remember = true) => {
  if (remember) {
    localStorage.setItem('authToken', token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  } else {
    sessionStorage.setItem('authToken', token);
    if (user) sessionStorage.setItem('user', JSON.stringify(user));
  }
  try {
    window.dispatchEvent(new Event('sessionChanged'));
  } catch (e) {
    /* noop for non-browser environments */
  }
};

export const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export const getUser = () => {
  const u = localStorage.getItem('user') || sessionStorage.getItem('user');
  return u ? JSON.parse(u) : null;
};
