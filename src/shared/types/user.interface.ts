import { IContact, IDialog } from "@/src/shared";

export interface IUser {
  id: number;
  account_id: string;
  username: string;
  email: string;
  avatar: string;
  access_token: string;
  last_seen: Date;
  created_at?: Date;
  update_at?: Date;
  is_online: boolean;
  is_activated: boolean;
  contacts: IContact[];
  dialogs: IDialog[],
}

export  interface IAuthResponse {
  user: IUser
}
