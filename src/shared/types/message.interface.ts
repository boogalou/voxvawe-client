import { IVoiceMessageData } from "shared/types";

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
  voice_message: FormData | null;
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
  attachments: IAttachments[] | [];
  voice_message: IVoiceMessageData | null;
}

export interface IVoiceData {
  duration: number;
  waveform: number[]
  link_ogg: string;

}

export interface IAttachments {
  width: number;
  height: number;
  type: 'y';
  url: string;
  // id: number;
  // ownerId: number;
  // largeSizeUrl: string;
  // mediumSizeUrl: string;
}
