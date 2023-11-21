import {CreateProductController} from "@controllers/product";


interface ISutTypes {
    sut: CreateProductController
}

const makeSut = (): ISutTypes => {

    const sut = new CreateProductController()

    return {
        sut
    }

}

describe('Create Product Controller', () => {
    //Todo: Change this test
    it('should return 200 if everything was right', () => {
        const { sut } = makeSut()
        const request = {
            body: {}
        }
        const response = sut.handle(request)
        expect(response.statusCode).toBe(200)
    });

    it('should return 400 no body was passed', () => {
        const { sut } = makeSut()
        const request = {}
        const response = sut.handle(request)
        expect(response.statusCode).toBe(400)
    });
});