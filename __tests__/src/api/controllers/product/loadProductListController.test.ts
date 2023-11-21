import {LoadProductListController} from "../../../../../src/api/controllers/product/LoadProductListController";


interface ISutTypes {
    sut: LoadProductListController
}

const makeSut = (): ISutTypes => {

    const sut = new LoadProductListController()

    return {
        sut
    }

}

describe('Load Product List Controller', () => {
    it('should return 200 if everything was right', () => {
        const { sut } = makeSut()
        const request = {
            body: {}
        }
        const response = sut.handle(request)
        expect(response.statusCode).toBe(200)
    });
});