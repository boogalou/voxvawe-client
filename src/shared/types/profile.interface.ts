
export interface IProfile {
  id: number;
  account_id: string;
  username: string;
  email: string;
  gender: string;
  age: string;
  bio: string;
  createdAt?: Date;
  updateAt?: Date;
}