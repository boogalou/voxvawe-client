import { useEffect, useRef } from 'react';
import io, { ManagerOptions, SocketOptions, Socket } from 'socket.io-client';



export function useSocket(url: string, config?: Partial<ManagerOptions & SocketOptions> | undefined): Socket {
  const { current: socket } = useRef(io(url, config));

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket]);

  return socket;
}