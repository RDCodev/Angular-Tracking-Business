import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthForm } from "../utils/factory/auth-factory.util";
import { inject } from "@angular/core";
import { SupabaseService } from "@core/services/supabase.service";

export interface RawSignIn {
  username    : string;
  password    : string;
  rememberMe  : boolean;
}

export class SignInDTO implements RawSignIn {
  
  public username     : string;
  public password     : string;
  public rememberMe   : boolean = false;

  constructor(options: RawSignIn) {
    this.username     = options.username;
    this.password     = options.password;
    this.rememberMe   = options.rememberMe || false;
  }
}

export class SignInForm<T = SignInDTO> implements AuthForm<T> {

  private _supabase = inject(SupabaseService);

  dto   !: T;
  form  !: FormGroup;

  constructor() { this.init();  }

  private init() {

    const usernameValidators = [Validators.required];
    const passwordValidators = [Validators.required];

    this.form = new FormGroup({
      username: new FormControl<string>('', { 
        validators: usernameValidators, 
        updateOn: 'change' 
      }),
      password: new FormControl<string>('', { 
        validators: passwordValidators, 
        updateOn: 'blur' 
      }),
      rememberMe: new FormControl<boolean>(false),
    });

  }

  public validate(cb?: (param: T) => void) {
    cb && cb(new SignInDTO(this.form.value) as T);
  }

  public submit() {
    return this._supabase.signInUser()
  }
}