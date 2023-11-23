import { type IHttpRequest, type IHttpResponse } from '@/api/protocols/http';

export interface IController {
  handle: (req: IHttpRequest) => Promise<IHttpResponse>;
}
