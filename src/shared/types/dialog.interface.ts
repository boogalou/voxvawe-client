export interface IDialog {
  id: number;
  name: string;
  interlocutor_id: string;
  interlocutor_name: string;
  interlocutor_avatar: string;
  last_message_text: string;
  last_message_status: string;
  unread_messages: number;
  last_message_time: Date;
  created_at: Date;
  updated_at: Date;
  isActive: boolean;
}