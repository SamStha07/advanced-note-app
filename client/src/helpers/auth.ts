import { useApolloClient } from '@apollo/client';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { EXPRESS_URL } from '../constants';
import axios from 'axios';

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

export const usePrepareApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { resetStore } = useApolloClient();

  useEffect(() => {
    fetch(`${EXPRESS_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('refresh data', data);

        if (data?.success && data?.accessToken) {
          saveToken(data?.accessToken);
          setIsLoading(false);
        } else {
          clearToken();
          resetStore();
          setIsLoading(false);
        }
      });
  }, [resetStore]);

  return { isLoading };
};
