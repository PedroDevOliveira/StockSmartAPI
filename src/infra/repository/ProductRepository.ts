export class ProductRepository {
  async create(params: any): Promise<any> {
    return await new Promise(resolve => {
      resolve(params);
    });
  }
}
