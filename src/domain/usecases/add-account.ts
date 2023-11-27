import { type User } from '@/domain/entities/User';

export interface IAddAccountModel {
  email: string;
  password: string;
}

export interface IAddAccount {
  execute: (account: IAddAccountModel) => Promise<User>;
}
