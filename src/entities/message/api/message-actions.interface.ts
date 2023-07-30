
export interface IMessageActions {
  type:  'MESSAGE:GET_MESSAGE_STATUS' | 'MESSAGE:ERROR_RESPONSE' ;
  payload: any;
}