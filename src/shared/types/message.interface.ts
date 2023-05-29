export interface IMessage {
  id: number;
  userId: number;
  body: string;
  timestamp: string;
  isRead: boolean;
  isGroup: boolean;
  attachments: [];
}