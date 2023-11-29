import bcrypt from 'bcrypt';
import { type IHasher } from '@/infra/gateways/cryptography/interface';

export class BcryptAdapter implements IHasher {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt);
  }

  // async compare(plaintext: string, digest: string): Promise<boolean> {
  //   return bcrypt.compare(plaintext, digest);
  // }
}
