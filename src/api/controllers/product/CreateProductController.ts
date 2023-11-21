import {IHttpRequest, IHttpResponse} from "@/api/protocols/http";
import {IController} from "@/api/protocols/controller";
import {badRequest, MissingParamError} from "@/api/errors/badRequest";

export class CreateProductController implements IController{
    handle(req: IHttpRequest): IHttpResponse {
        if (!req.body) {
            return badRequest(new MissingParamError('req.body'))
        }

        const requiredFields = ['name', 'price']

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        return {
            statusCode: 200,
            body: []
        }
    }
}