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
  isActive: boolean;
  is_online: boolean;
}