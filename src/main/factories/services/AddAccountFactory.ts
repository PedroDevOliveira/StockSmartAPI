import { AddAccountService } from '@/domain/services/account/AddAccountService';
import { UserRepository } from '@/infra/db/repository/UserRepository';
import { BcryptAdapter } from '@/infra/gateways/cryptography/bcrypt';

export const makeAddAccountService = (): AddAccountService => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const repository = new UserRepository();
  return new AddAccountService(bcryptAdapter, repository);
};
