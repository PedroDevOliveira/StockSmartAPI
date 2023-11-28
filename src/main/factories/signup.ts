import { SignUpController } from '@controllers/account/SignUpController';
import { AddAccountService } from '@/domain/services/account/AddAccountService';
import { UserRepository } from '@/infra/db/repository/UserRepository';

export const makeSignUpController = (): SignUpController => {
  const repository = new UserRepository();
  const addAccountService = new AddAccountService(repository);
  return new SignUpController(addAccountService);
};
