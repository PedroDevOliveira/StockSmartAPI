import { User } from '@/domain/entities/User';
import { SignUpController } from '@controllers/account/SignUpController';
import { InvalidParamError, MissingParamError } from '@/api/errors/badRequest';
import { ServerError } from '@/api/errors/serverError';
import { IAddAccount, IAddAccountModel } from '@/domain/usecases/add-account';
import { IHttpRequest } from '@/api/protocols/http';

const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async execute(_: IAddAccountModel): Promise<User> {
      const fakeAccount = {
        id: 'valid_id',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      };
      return new Promise(resolve => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  }
});

interface SutTypes {
  sut: SignUpController;
  addAccountStub: IAddAccount;
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(addAccountStub);
  return {
    sut,
    addAccountStub
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        confirmPassword: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no password confirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'));
  });

  test('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'invalid_password'
      }
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('confirmPassword'));
  });

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'execute').mockImplementationOnce(async () => {
      return new Promise((_, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'execute');
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    });
  });

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    });
  });
});
