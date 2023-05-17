export interface IDialog {
  id: number;
  name: string;
  interlocutorId: string;
  interlocutorName: string;
  interlocutorAvatar: string;
  lastMessageText: string;
  lastMessageStatus: string;
  unreadMessages: number;
  lastMessageTime: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}