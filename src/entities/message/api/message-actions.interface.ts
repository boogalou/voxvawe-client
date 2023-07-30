
export interface IMessageActions {
  type:  'MESSAGE:GET_MESSAGE_IS_READ' | 'MESSAGE:ERROR_RESPONSE' ;
  payload: any;
}