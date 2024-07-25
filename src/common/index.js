export const getTokenFromCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};

export const writeCookie = (cookieName, cookieValue, days) => {
  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};path=/`;
};
