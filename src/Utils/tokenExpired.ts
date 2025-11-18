const getToken = () => localStorage.getItem("token");

export const getTokenExpirationDate = (): Date | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? new Date(payload.exp * 1000) : null;
  } catch {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const expDate = getTokenExpirationDate();
  if (!expDate) return true;
  return Date.now() >= expDate.getTime();
};