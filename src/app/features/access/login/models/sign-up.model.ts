export interface RawSignUp {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  password: string | undefined;
}

export class SignUpDTO implements RawSignUp {

  public firstName: string | undefined;
  public lastName: string | undefined;
  public username: string | undefined;
  public password: string | undefined;

  constructor(options: Partial<RawSignUp>) {
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.username = options.username;
    this.password = options.password;
  }
  
}
