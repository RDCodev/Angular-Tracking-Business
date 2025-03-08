import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccessForm } from "../utils/access-factory.util";

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

export class SignInForm implements AccessForm {

  dto   !: SignInDTO;
  form  !: FormGroup;

  constructor() {
    this.initialize();
  }

  private initialize() {

    const usernameValidators = [Validators.required];
    const passwordValidators = [Validators.required];

    this.form = new FormGroup({
      username: new FormControl('', { validators: usernameValidators, updateOn: 'change' }),
      password: new FormControl('', { validators: passwordValidators, updateOn: 'blur' }),
      rememberMe: new FormControl(false),
    });

  }

  public validate(cb: (param: SignInDTO) => void) {
    cb(new SignInDTO(this.form.value as SignInDTO));
  }
}