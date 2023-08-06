import { IContact } from "@/src/shared";

export interface IDialog {
  id: number;
  username: string;
  group_avatar: string;
  avatar: string;
  group_name: string;
  account_id: string;
  is_group: boolean;
  lastMessage: string;
  lastMessageStatus: string;
  unreadMessages: number;
  lastMessageTime: Date;
  createdAt: Date;
  updatedAt: Date;
  members: IContact[]
  isActive: boolean;
  is_online: boolean;
}