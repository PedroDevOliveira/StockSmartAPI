export interface IHttpRequest {
    body?: any
}

export interface IHttpResponse {
    statusCode: number,
    body: any
}

export class LoadProductListController {
    handle(data: IHttpRequest): IHttpResponse {
        return {
            statusCode: 200,
            body: []
        }
    }
}