import {LoadProductListController} from "@controllers/product";


interface ISutTypes {
    sut: LoadProductListController
}

const makeSut = (): ISutTypes => {

    const sut = new LoadProductListController()

    return {
        sut
    }

}

describe('Load Product List Controller',  () => {
    //Todo: Change this test
    it('should return 200 if everything was right', async () => {
        const { sut } = makeSut()
        const request = {
            body: {}
        }
        const response = await sut.handle(request)
        expect(response.statusCode).toBe(200)
    });
});