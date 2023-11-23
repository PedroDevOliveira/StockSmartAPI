import { type IHttpResponse } from '@/api/protocols/http';

export class MissingParamError extends Error {
  constructor(nomeParametros: string) {
    super(`The param ${nomeParametros} is required.`);
  }
}

export const badRequest = (erro: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: erro
  };
};
