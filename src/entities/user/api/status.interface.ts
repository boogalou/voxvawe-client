

export interface IStatusUpdateResponse {
  payload: any,
  type: 'USER:STATUS_ONLINE' | 'USER:STATUS_OFFLINE' | 'USER:ERROR'
}