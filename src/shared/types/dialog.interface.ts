export interface IDialog {
  id: number;
  username: string;
  avatar: string;
  account_id: string;
  lastMessage: string;
  lastMessageStatus: string;
  unreadMessages: number;
  lastMessageTime: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  is_online: boolean;
}