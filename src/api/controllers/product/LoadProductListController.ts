import {IHttpRequest, IHttpResponse} from "@/api/protocols/http";
import {IController} from "@/api/protocols/controller";

export class LoadProductListController implements IController {
    handle(req: IHttpRequest): Promise<IHttpResponse> {
        return new Promise(resolve => resolve({
            statusCode: 200,
            body: []
        }))
    }
}