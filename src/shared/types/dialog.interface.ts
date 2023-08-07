import { IContact } from "shared/types";

export interface IDialog {
  id: number;
  username: string;
  avatar: string;
  is_group: boolean;
  lastMessage: string;
  lastMessageStatus: string;
  unreadMessages: number;
  lastMessageTime: Date;
  members: IContact[]
}