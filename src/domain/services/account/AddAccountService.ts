import { IAddAccount, IAddAccountModel } from '@/domain/usecases/add-account';
import { User } from '@/domain/entities/User';
import { IAddAccountRepository } from '@/infra/db/interfaces/account/add-account-repository';
export class AddAccountService implements IAddAccount {
  private readonly addAccountRepository: IAddAccountRepository;
  constructor(addAccountRepository: IAddAccountRepository) {
    this.addAccountRepository = addAccountRepository;
  }

  async execute(params: IAddAccountModel): Promise<User> {
    return await this.addAccountRepository.add(new User(params));
  }
}
