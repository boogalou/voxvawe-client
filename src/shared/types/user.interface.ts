export interface IUser {
  id: number;
  accountId: string;
  username: string;
  email: string;
  avatar: string;
  accessToken: string;
  lastSeen: Date;
  createdAt?: Date;
  updateAt?: Date;
  isOnline: boolean;
  isActivated: boolean;
}

export  interface IAuthResponse {
  user: IUser
}
