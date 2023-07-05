export interface IMessage {
  id: number;
  chat_id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  sent_at: Date;
  edit_at: Date | null;
  is_read: boolean;
  is_delivered: boolean;
  is_deleted: boolean;
  attachments: [];
}