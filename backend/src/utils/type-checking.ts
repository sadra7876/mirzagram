export function isValidEmail(email: string): boolean {
  // eslint-disable-next-line no-useless-escape
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.log(e); //FIXME - add logging
    return false;
  }
};
