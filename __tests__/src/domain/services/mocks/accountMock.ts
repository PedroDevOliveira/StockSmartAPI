import { fakerPT_BR as faker } from '@faker-js/faker';
import { IAddAccountModel } from '@/domain/usecases/add-account';

export const mockAddAccountParams = (): IAddAccountModel => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});
