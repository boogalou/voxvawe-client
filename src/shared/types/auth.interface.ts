import { IUser } from 'shared/types';

export interface IAuthData {
  username?: string;
  email: string;
  password: string;
}

export interface IAuthRequestData {
  user: IAuthData;
}

export interface IAuthResponseData {
  user: IUser;
}

export interface IErrorResponse {
  status: number;
  message: string;
  time: string;
}
