/**
 * Sets a cookie with the given name, value, and expiration time in days.
 *
 * @param name - The name of the cookie to set.
 * @param value - The value of the cookie to set.
 * @param days - The number of days until the cookie will expire.
 */
export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Retrieves the value of a cookie by its name.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie if found, otherwise null.
 */

export const getCookie = (name: string): string | null => {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (const c of ca) {
    const trimmedC = c.trim();
    if (trimmedC.startsWith(cname)) {
      return trimmedC.substring(cname.length, trimmedC.length);
    }
  }
  return null;
};
