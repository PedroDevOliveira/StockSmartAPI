import { type IHttpResponse } from '@/api/protocols/http';

export class ServerError extends Error {
  constructor() {
    super('Internal Server Error!.');
  }
}

export const serverError = (): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  };
};
