import {IHttpRequest, IHttpResponse} from "@/api/protocols/http";
import {IController} from "@/api/protocols/controller";
import {badRequest, MissingParamError} from "@/api/errors/badRequest";
import { AddProductService } from "@/domain/services/product/AddProductService";

export class CreateProductController implements IController {
    private readonly addProductService: AddProductService
    constructor(addProductService: AddProductService) {
        this.addProductService = addProductService
    }
    async handle(req: IHttpRequest): Promise<IHttpResponse> {
        if (!req.body) {
            return badRequest(new MissingParamError('req.body'))
        }

        const requiredFields = ['name', 'price']

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        const { name, price } = req.body

        const product = await this.addProductService.execute({name, price})

        return {
            statusCode: 200,
            body: product
        }
    }
}