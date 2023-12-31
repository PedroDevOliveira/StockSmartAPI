import { type IController } from '@/api/protocols/controller';
import { type IHttpRequest, type IHttpResponse, success } from '@/api/protocols/http';
import { serverError } from '@/api/errors/serverError';
import { badRequest, InvalidParamError, MissingParamError } from '@/api/errors/badRequest';
import { type IAddAccount } from '@/domain/usecases/add-account';

export class SignUpController implements IController {
  private readonly addAccount: IAddAccount;
  constructor(addAccount: IAddAccount) {
    this.addAccount = addAccount;
  }

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['email', 'password', 'confirmPassword'];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('confirmPassword'));
      }

      const account = await this.addAccount.execute({
        email,
        password
      });
      return success(account);
    } catch (error) {
      return serverError();
    }
  }
}
