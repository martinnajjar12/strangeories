import { useState } from 'react';

interface newToken {
  uid: string;
  'access-token': string;
  'token-type': string;
  expiry: string;
  client: string;
}

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) return JSON.parse(localToken);
    return null;
  });

  const setToken = (newToken: newToken) => {
    localStorage.setItem('token', JSON.stringify(newToken));
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
