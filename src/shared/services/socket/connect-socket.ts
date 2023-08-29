import { getAccessToken } from 'entities/user';
import io, { Socket } from 'socket.io-client';
import { socketConfig } from './socket-config';

const activeSockets: Socket[] = [];

export async function connectSocket({
  payload,
}: ReturnType<typeof getAccessToken>): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const accessToken = payload.access_token;
    socketConfig.auth.authorization = 'Bearer ' + accessToken;
    const newSocket = io(`${import.meta.env.VITE_SOKCET_SERVER}`, socketConfig);

    newSocket.on('connect', () => {
      console.log('Connect to server success');
      activeSockets.push(newSocket)
      resolve(newSocket);
    });

    newSocket.on('connect_error', error => {
      console.log(error);
      reject(error);
    });

    newSocket.connect();
  });
}

export function closeAllSocketConnection() {
  activeSockets.forEach(socket => socket.disconnect());
  activeSockets.length = 0;
}
