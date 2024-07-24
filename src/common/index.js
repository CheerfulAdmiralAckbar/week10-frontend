export const getTokenFromCookie = (cookieName) => {
  const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
  return match ? match[2] : null;
};

export const writeCookie = (cookieName, cookieValue, days) => {
  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};path=/`;
};
