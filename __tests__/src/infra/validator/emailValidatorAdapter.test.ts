import { EmailValidatorAdapter } from '@/infra/validator/emailValidaotrAdapter';
import validator from 'validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  }
}));

const makeSut = () => {
  const sut = new EmailValidatorAdapter();

  return {
    sut
  };
};

describe('Email Validator Adapter', () => {
  it('should return false if validator returns false', () => {
    const { sut } = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@gmail.com');
    expect(isValid).toBe(false);
  });

  it('should return false if validator returns true', () => {
    const { sut } = makeSut();
    const isValid = sut.isValid('valid_email@gmail.com');
    expect(isValid).toBe(true);
  });
});
