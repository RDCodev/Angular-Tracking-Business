export interface RawSignIn {
  username: string | undefined;
  password: string | undefined;
  rememberMe: boolean;
}

export class SignInDTO implements RawSignIn {
  
  public username: string | undefined;
  public password: string | undefined;
  public rememberMe: boolean = false;

  constructor(options: Partial<RawSignIn>) {
    this.username = options.username;
    this.password = options.password;
    this.rememberMe = options.rememberMe || false;
  }
}
