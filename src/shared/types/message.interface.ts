export interface IMessage {
  messageId: number;
  chatId: number;
  senderId: string;
  recipientId: string;
  content: string;
  sentAt: Date;
  editAt: Date | null;
  isRead: boolean;
  isDelivered: boolean;
  is_deleted: boolean;
  attachments: [];
}