export interface MessageResponse {
  type: 'CHAT:JOINED_PRIVATE_ROOM'
    | 'CHAT:LEFT_PRIVATE_ROOM'
    | 'CHAT:NEW_MESSAGE'
    | 'CHAT:TYPING_NOTIFY'
    | 'CHAT:GET_MESSAGE_STATUS'
    | 'CHAT:SET_MESSAGE_STATUS'
    | 'ERROR_RESPONSE'
  payload: any;
};