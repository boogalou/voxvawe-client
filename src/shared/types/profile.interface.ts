
export interface IProfile {
  id: number;
  accountId: string;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  age: string;
  bio: string;
  createdAt?: Date;
  updateAt?: Date;
}