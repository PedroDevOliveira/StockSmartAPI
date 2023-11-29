import { type IAddAccount, type IAddAccountModel } from '@/domain/usecases/add-account';
import { User } from '@/domain/entities/User';
import { type IAddAccountRepository } from '@/infra/db/interfaces/account/add-account-repository';
import { type IHasher } from '@/infra/gateways/cryptography/interface';
export class AddAccountService implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository
  ) {}

  async execute(params: IAddAccountModel): Promise<User> {
    const hashedPassword = await this.hasher.hash(params.password);
    return await this.addAccountRepository.add(new User({ ...params, password: hashedPassword }));
  }
}
