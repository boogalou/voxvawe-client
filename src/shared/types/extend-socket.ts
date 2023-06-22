import { Socket } from "socket.io-client";


export interface ExtendSocket extends Socket {
  query: {
      Authorization: null | string;
  }
}