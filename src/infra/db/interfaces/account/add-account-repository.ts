import { type User } from '@/domain/entities/User';
import { type IAddAccountModel } from '@/domain/usecases/add-account';

export interface IAddAccountRepository {
  add: (accountData: IAddAccountModel) => Promise<User>;
}
