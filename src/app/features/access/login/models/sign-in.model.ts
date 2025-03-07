import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccessForm } from "../utils/access-factory.util";
import { toSignal } from "@angular/core/rxjs-interop";

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

    this.form = new FormGroup({
      username: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
      password: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      rememberMe: new FormControl(false),
    });

  }

  public validate(cb: (param?: any) => void) {
    cb(new SignInDTO(this.form.value));
  }
}