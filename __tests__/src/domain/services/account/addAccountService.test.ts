import { IAddAccountRepository } from '@/infra/db/interfaces/account/add-account-repository';
import { User } from '@/domain/entities/User';
import { IAddAccountModel } from '@/domain/usecases/add-account';
import { AddAccountService } from '@/domain/services/account/AddAccountService';
import { mockAddAccountParams } from '../mocks/accountMock';
import { HasherSpy } from '../mocks/cryptographyMock';

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add(accountData: IAddAccountModel): Promise<User> {
      return new Promise(resolve => resolve(new User(accountData, 'valid_id')));
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: AddAccountService;
  addAccountRepositoryStub: IAddAccountRepository;
  hasherSpy: HasherSpy;
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const hasherSpy = new HasherSpy();
  const sut = new AddAccountService(hasherSpy, addAccountRepositoryStub);
  return {
    sut,
    addAccountRepositoryStub,
    hasherSpy
  };
};

describe('AddAccountService', () => {
  test('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.execute(addAccountParams);
    expect(hasherSpy.plaintext).toBe(addAccountParams.password);
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.execute(mockAddAccountParams());
    expect(addSpy).toHaveBeenCalled();
  });

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const promise = sut.execute(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return an account on success', async () => {
    const { sut, hasherSpy } = makeSut();
    const accountData = mockAddAccountParams();
    const account = await sut.execute(accountData);
    expect(account).toEqual({
      id: 'valid_id',
      email: accountData.email,
      password: hasherSpy.digest
    });
  });
});
