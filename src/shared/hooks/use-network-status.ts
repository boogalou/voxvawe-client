import { useEffect, useState } from "react";


export const useNetworkStatus = () => {
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setStatus(true);
    };

    const handleOffline = () => {
      setStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status
}