export interface IDialog {
  id: number;
  name: string;
  avatar: string;
  accountId: string;
  lastMessageText: string;
  lastMessageStatus: string;
  unreadMessages: number;
  lastMessageTime: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isOnline: boolean;
}