export class MissingParamError extends Error {
    constructor(nomeParametros: string) {
        super(`The param ${nomeParametros} is required.`);
    }
}


export const badRequest = (erro: Error) => {
    return {
        statusCode: 400,
        body: erro
    }
}