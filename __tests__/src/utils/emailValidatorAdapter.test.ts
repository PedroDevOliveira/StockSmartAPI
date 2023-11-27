import { EmailValidatorAdapter } from '@/utils/emailValidaotrAdapter';

describe('Email Validator Adapter', () => {
  it('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('invalid_email@gmail.com');
    expect(isValid).toBe(false);
  });
});
