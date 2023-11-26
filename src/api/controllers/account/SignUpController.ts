import { IController } from '@/api/protocols/controller';
import { IHttpRequest, IHttpResponse } from '@/api/protocols/http';
import { serverError } from '@/api/errors/serverError';
import { badRequest, InvalidParamError, MissingParamError } from '@/api/errors/badRequest';
import { IAddAccount } from '@/domain/usecases/add-account';

export class SignUpController implements IController {
  private readonly addAccount: IAddAccount;
  constructor(addAccount: IAddAccount) {
    this.addAccount = addAccount;
  }

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password, passwordConfirmation } = req.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const account = await this.addAccount.execute({
        email,
        password
      });
      return {
        statusCode: 200,
        body: account
      };
    } catch (error) {
      return serverError();
    }
  }
}
