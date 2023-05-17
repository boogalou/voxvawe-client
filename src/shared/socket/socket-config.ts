import io, { ManagerOptions, SocketOptions } from 'socket.io-client';
import { API_URL } from 'shared/constants';


export const socketConfig: Partial<ManagerOptions & SocketOptions> = {
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
};
