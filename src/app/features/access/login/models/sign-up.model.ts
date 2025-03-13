import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccessForm } from '../utils/factory/access-factory.util';
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

export class SignUpForm<T = SignUpDTO> implements AccessForm<T> {

  private _supabase = inject(SupabaseService)

  dto   !: T;
  form  !: FormGroup;

  constructor() { this.init(); }

  private init() {
    this.form = new FormGroup(
      {
        firstName: new FormControl<string | null>(null),
        lastName: new FormControl<string | null>(null),
        username: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        password: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
        email: new FormControl<string>('', {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }),
        confirmPassword: new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      },
      { validators: validatePasswords }
    );
  }

  public validate(cb?: (param: T) => void) {
    cb && cb(new SignUpDTO(this.form.value) as T);
  }

  public submit(cb: (res: AuthResponse) => void) {
    this._supabase.createUser(this.form.value)
  }
}
