export interface IHttpRequest {
  body?: any;
}

export interface IHttpResponse {
  statusCode: number;
  body: any;
}

export const success = (body: any): IHttpResponse => ({
  statusCode: 200,
  body
});
