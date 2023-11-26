import { IAddAccountRepository } from '@/infra/db/interfaces/account/add-account-repository';
import { User } from '@/domain/entities/User';
import { IAddAccountModel } from '@/domain/usecases/add-account';
import { AddAccountService } from '@/domain/services/account/AddAccountService';

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add(accountData: IAddAccountModel): Promise<User> {
      const fakeAccount = {
        id: 'valid_id',
        email: 'valid_email',
        password: 'valid_password'
      };
      return new Promise(resolve => resolve(fakeAccount));
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: AddAccountService;
  addAccountRepositoryStub: IAddAccountRepository;
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new AddAccountService(addAccountRepositoryStub);
  return {
    sut,
    addAccountRepositoryStub
  };
};

describe('AddAccountService', () => {
  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      email: 'valid_email',
      password: 'valid_password'
    };
    await sut.execute(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email',
      password: 'valid_password'
    });
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const accountData = {
      email: 'valid_email',
      password: 'valid_password'
    };
    const promise = sut.execute(accountData);
    await expect(promise).rejects.toThrow();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const accountData = {
      email: 'valid_email',
      password: 'valid_password'
    };
    const account = await sut.execute(accountData);
    expect(account).toEqual({
      id: 'valid_id',
      email: 'valid_email',
      password: 'valid_password'
    });
  });
});
