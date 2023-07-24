import { getAccessToken } from 'entities/user';
import io, { Socket } from 'socket.io-client';
import { socketConfig } from './socket-config';
import { API_URL } from 'shared//constants';


const activeSockets: Socket[] = [];

export async function connectSocket(action: ReturnType<typeof getAccessToken>): Promise<Socket> {
  return new Promise((resolve, reject) => {

    const stackTrace = new Error().stack;

    socketConfig.auth.authorization = 'Bearer ' + action.payload.access_token;

    const newSocket = io(API_URL, socketConfig);
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

  export function getSocketConnectionCount() {
    console.log('Открыто socket-соединений ' + activeSockets.length);
  }

