import { IUser } from 'shared/types';

export interface IAuthData {
  username?: string;
  email: string;
  password: string;
}

export interface IAuthRequestData {
  user: IAuthData;
}

export interface IAuthRsponseData {
  user: IUser;
}