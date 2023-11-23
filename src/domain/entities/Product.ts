export class Product {
  public readonly id: string | undefined;

  public name: string;
  public price: string;

  constructor(props: Omit<Product, 'id'>, id?: string) {
    this.name = props.name;
    this.price = props.price;
  }
}
