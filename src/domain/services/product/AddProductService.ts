export interface IService {
    execute(params: any): Promise<any>
}

export class AddProductService implements IService {
    async execute(params: any): Promise<any> {
        return await new Promise(resolve => resolve(params))
    }
}