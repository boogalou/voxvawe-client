export interface MessageResponse {
  type: 'CHAT:JOINED_PRIVATE_ROOM' | 'CHAT:NEW_MESSAGE' | 'ERROR_RESPONSE';
  payload: any;
};