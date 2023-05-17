import { useCallback, useEffect } from 'react';
import { useAppSelector } from 'shared/hooks';

export function useLocalStorageSync() {
  const accessToken = useAppSelector(state => state.authSlice.user.accessToken);
  const syncToken = useCallback((token: string) => {
    const storedToken = localStorage.getItem('token');
    if (token && token !== storedToken) {
      localStorage.setItem('token', token);
    }
  }, []);

  useEffect(() => {
    syncToken(accessToken);


  }, [accessToken]);

  return accessToken;
}