import { User } from '@/domain/entities/User';
import { IAddAccountModel } from '@/domain/usecases/add-account';

export interface IAddAccountRepository {
  add(accountData: IAddAccountModel): Promise<User>;
}
