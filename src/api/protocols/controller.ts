import {IHttpRequest, IHttpResponse} from "@/api/protocols/http";

export interface IController {
    handle(req: IHttpRequest): Promise<IHttpResponse>
}