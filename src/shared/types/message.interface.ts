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
  attachments: File[] | string[] | null;
}

export interface IOutMessage {
  chat_id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  sent_at: Date;
  attachments: FormData | null;
}

export interface InMessage {
  id: number;
  chat_id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  sent_at: Date;
  edit_at: Date | null;
  is_read: boolean;
  is_delivered: boolean;
  attachments: Attachments[] | [];
}

export interface Attachments {
  id: number;
  ownerId: number;
  largeSizeUrl: string;
  mediumSizeUrl: string;
}
