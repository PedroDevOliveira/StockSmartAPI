export class User {
  public readonly id: string | undefined;

  public email: string;
  public password: string;

  constructor(props: Omit<User, 'id'>, id?: string) {
    this.email = props.email;
    this.password = props.password;
  }
}
