import {IHttpRequest, IHttpResponse} from "@/api/protocols/http";
import {IController} from "@/api/protocols/controller";

export class CreateProductController implements IController{
    handle(req: IHttpRequest): IHttpResponse {
        if (!req.body) {
            return {
                statusCode: 400,
                body: []
            }
        }

        return {
            statusCode: 200,
            body: []
        }
    }
}