
export interface IProfile {
  id: number;
  accountId: string;
  username: string;
  email: string;
  gender: string;
  age: string;
  bio: string;
  createdAt?: Date;
  updateAt?: Date;
}