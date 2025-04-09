import { FormControl, FormControlOptions, FormGroup, Validators } from "@angular/forms";
import { AuthForm } from "../utils/factory/auth-factory.util";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export interface RawSignIn {
  email    : string;
  password    : string;
  rememberMe  : boolean;
}

export class SignInDTO implements RawSignIn {
  
  public email     : string;
  public password     : string;
  public rememberMe   : boolean = false;

  constructor(options: RawSignIn) {
    this.email     = options.email;
    this.password     = options.password;
    this.rememberMe   = options.rememberMe || false;
  }
}

const signInControls: Record<string, FormControlOptions> = { 
  "email": {
    validators: [Validators.required, Validators.email],
    nonNullable: true
  },
  "password": {
    validators: [Validators.required],
    nonNullable: true,
  },
  "rememberMe": {
    validators: [],
    nonNullable: true,
  }
}

export class SignInForm<T = SignInDTO> implements AuthForm<T> {

  private auth = inject(AuthService);

  dto   !: T;
  form  !: FormGroup;

  constructor() { this.init();  }

  private init() {

    this.form = new FormGroup({
      email: new FormControl<string>('', signInControls['email']),
      password: new FormControl<string>('', signInControls['password']),
      rememberMe: new FormControl<boolean>(false, signInControls['rememberMe']),
    });
  }

  public submit() {
    return this.auth.signInUser(new SignInDTO(this.form.value))
  }
}