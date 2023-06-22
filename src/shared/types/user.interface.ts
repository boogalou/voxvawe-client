import { IContact, IDialog } from "@/src/shared";

export interface IUser {
  id: number;
  accountId: string;
  username: string;
  email: string;
  avatar: string;
  accessToken: string;
  lastSeen: Date;
  createdAt?: Date;
  updateAt?: Date;
  isOnline: boolean;
  isActivated: boolean;
  contacts: IContact[];
  dialogs: IDialog[],
}

export  interface IAuthResponse {
  user: IUser
}
