import { FormControl, FormControlOptions, FormControlStatus, FormGroup, Validators } from "@angular/forms";
import { AuthForm } from "../utils/factory/auth-factory.util";
import { ChangeDetectorRef, inject, Signal } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { toSignal } from "@angular/core/rxjs-interop";

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

export class SignInForm<T = SignInDTO, H = string> implements AuthForm<T, H> {

  private auth = inject(AuthService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  dto   !: T;
  form  !: FormGroup;
  statusChange !: Signal<FormControlStatus | undefined>

  constructor() { this.init();  }

  private init() {
    this.form = new FormGroup({
      email: new FormControl<string>('', signInControls['email']),
      password: new FormControl<string>('', signInControls['password']),
      rememberMe: new FormControl<boolean>(false, signInControls['rememberMe']),
    });

    this.wrapStatusFormChange();
  }

  private wrapStatusFormChange() {

    if (!this.form) throw Error("Form is not initialize...");

    this.statusChange = toSignal(this.form.statusChanges)
  }

  public submit(cb?: (...args: H[]) => void): Promise<string> {

    if (cb && cb instanceof Function) cb();

    return this.auth.signInUser(new SignInDTO(this.form.value))
  }
}