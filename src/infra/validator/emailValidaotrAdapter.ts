import validator from 'validator';

export interface EmailValidator {
  isValid(email: string): boolean;
}

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
