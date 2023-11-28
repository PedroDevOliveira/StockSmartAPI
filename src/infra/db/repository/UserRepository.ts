import { IAddAccountRepository } from '@/infra/db/interfaces/account/add-account-repository';
import { IAddAccountModel } from '@/domain/usecases/add-account';
import { User } from '@/domain/entities/User';
import UserModel from '@/infra/db/models/UserModel';

export class UserRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<User> {
    const account = await UserModel.create({ ...accountData });
    return { ...account.dataValues };
  }
}
