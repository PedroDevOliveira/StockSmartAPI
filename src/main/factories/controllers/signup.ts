import { SignUpController } from '@controllers/account/SignUpController';
import { makeAddAccountService } from '@/main/factories/services/AddAccountFactory';

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeAddAccountService());
};
