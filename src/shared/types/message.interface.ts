export interface IMessage {
  id: number;
  userId: number;
  text: string;
  timestamp: string;
  isRead: boolean;
  isGroup: boolean;
  attachments: [];
}