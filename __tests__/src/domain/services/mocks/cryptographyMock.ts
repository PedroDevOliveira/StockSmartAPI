import { IHasher } from '@/infra/gateways/cryptography/interface';
import { faker } from '@faker-js/faker';

export class HasherSpy implements IHasher {
  digest = faker.string.uuid();
  plaintext: string | undefined;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}
