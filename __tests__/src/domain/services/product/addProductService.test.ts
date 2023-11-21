import {AddProductService} from "@/domain/services/product/AddProductService";

// const makeAddProductService = (): AddProductService => {
//     class AddProductServiceStub implements AddProductService {
//         async execute(params: any): Promise<any> {
//             return new Promise(resolve => resolve({
//                 id: 'valid_id',
//                 name: 'valid_name',
//                 description: 'valid_description',
//                 price: 'valid_price',
//                 createdAt: 'valid_createdAt',
//                 updatedAt: 'valid_updatedAt',
//                 removedAt: 'valid_removedAt',
//             }))
//         }
//     }
//     return new AddProductServiceStub()
// }

interface ISutTypes {
    sut: AddProductService
}

const makeSut = (): ISutTypes => {
    const sut = new AddProductService()

    return {
        sut
    }

}
//TODO: Improve this tests
describe('Add Product Service', () => {
    it('should return an new product', async () => {
        const {sut} = makeSut()

        const newProduct = await sut.execute({name: 'valid_name', price: 'valid_price'})
        expect(newProduct).toEqual(newProduct)
    });
});