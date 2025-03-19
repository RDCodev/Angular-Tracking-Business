import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthForm } from '../utils/factory/auth-factory.util';
import { validatePasswords } from '../utils/validators/validate-password';
import { inject } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { AuthResponse } from '@supabase/supabase-js';

export interface RawSignUp {
  firstName  ?: string | null;
  lastName   ?: string | null;
  email       : string;
  username    : string;
  password    : string;
}

export class SignUpDTO implements RawSignUp {
  public firstName   ?: string | null;
  public lastName    ?: string | null;
  public username     : string;
  public email        : string;
  public password     : string;

  constructor(options: RawSignUp) {
    this.firstName  = options.firstName;
    this.lastName   = options.lastName;
    this.username   = options.username;
    this.email      = options.email;
    this.password   = options.password;
  }
}

const signUpControls: Record<string, FormControlOptions> = {
  "username": {
    validators: [Validators.required],
    nonNullable: true
  },
  "password": {
    validators: [Validators.required],
    nonNullable: true,
  },
  "email": {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  },
  "confirmPassword": {
    validators: [Validators.required],
    nonNullable: true,
  }
}

export class SignUpForm<T = SignUpDTO> implements AuthForm<T> {

  private _supabase = inject(SupabaseService)

  dto   !: T;
  form  !: FormGroup;

  constructor() { this.init(); }

  private init() {

    this.form = new FormGroup(
      {
        firstName: new FormControl<string | null>(null),
        lastName: new FormControl<string | null>(null),
        username: new FormControl<string>('', signUpControls["username"]),
        password: new FormControl<string>('', signUpControls["password"]),
        email: new FormControl<string>('', signUpControls["email"]),
        confirmPassword: new FormControl<string>('', signUpControls["confirmPassword"]),
      },
      { validators: validatePasswords }
    );
  }

  public validate(cb?: (param: T) => void) {
    cb && cb(new SignUpDTO(this.form.value) as T);
  }

  public submit() {
    return this._supabase.signUpUser(this.form.value)
  }
}
