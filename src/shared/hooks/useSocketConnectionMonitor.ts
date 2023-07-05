import { useState } from 'react';
import { connectSocket } from 'shared/services/socket/connect-socket';

export const useSocketConnectionMonitor = (accessToken: string) => {
  const [socketConnection, setSocketConnection] = useState(false);

  connectSocket({
    payload: { access_token: accessToken },
    type: 'connect',
  }).then(socket => {
    if (socket.disconnected) {
      setSocketConnection(false);
    }

    if (socket.connected) {
      setSocketConnection(true);
    }
  });

  return socketConnection;
};