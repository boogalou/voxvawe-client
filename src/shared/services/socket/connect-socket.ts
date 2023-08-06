import { getAccessToken } from 'entities/user';
import io, { Socket } from 'socket.io-client';
import { socketConfig } from './socket-config';

export async function connectSocket({ payload }: ReturnType<typeof getAccessToken>): Promise<Socket> {
  return new Promise((resolve, reject) => {
    socketConfig.auth.authorization = 'Bearer ' + payload.access_token;
    const newSocket = io(`${import.meta.env.VITE_SOKCET_SERVER}`, socketConfig);
    newSocket.on('connect', () => {
      console.log('Connect to server success');

      resolve(newSocket);
    });

    newSocket.on('connect_error', error => {
      console.log(error);
      reject(error);
    });

    newSocket.connect();
  });
}
