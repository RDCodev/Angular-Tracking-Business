import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
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

  dto!: SignInDTO;
  form!: FormGroup;
  ctrls!: Record<string, AbstractControl>;

  constructor() {
    this.init();
  }

  private init() {
    
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });

    this.ctrls = this.form.controls;
  }

  public submit(): void {
    console.log('[Submit] - Sign In Form');
  }
}