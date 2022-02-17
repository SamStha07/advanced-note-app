import jwtDecode, { JwtPayload } from 'jwt-decode';

export const saveToken = (token: string) =>
  localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const clearToken = () => localStorage.removeItem('token');

export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (!token) return false;

  try {
    const { exp }: JwtPayload = jwtDecode(token);
    if (Date.now() >= exp! * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
