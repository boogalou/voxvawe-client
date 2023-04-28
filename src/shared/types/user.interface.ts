export interface IUser {
  id: number;
  accountId: string;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  isActivated: boolean;
}

export  interface IAuthResponse {
  user: IUser
}
