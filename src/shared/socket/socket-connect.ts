import io, { ManagerOptions, SocketOptions } from 'socket.io-client';
import { API_URL } from 'shared/constants';

 async function socketConnect() {
  const socket = io(API_URL, {
    autoConnect: false,
    transports: ['websocket'],
    withCredentials: true,

    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: '',
        },
      },

      websocket: {
        extraHeaders: {
          Authorization: '',
        },
      },
    },
  });
  try {
    socket.on('connect', () => {
      console.log('Connect to server');
    });

    socket.on('connect_error', error => {
      console.log(error);
    });

    socket.connect();
    return socket;
  } catch (error) {
    console.log(error);
    socket.disconnect()
  }
}

const socket = await socketConnect();
 export { socket }
