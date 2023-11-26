import { type IHttpResponse } from '@/api/protocols/http';

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = 'MissingParamError';
  }
}

export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamError';
  }
}

export const badRequest = (erro: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: erro
  };
};
