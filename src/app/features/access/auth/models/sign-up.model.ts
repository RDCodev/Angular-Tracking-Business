import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthForm } from '../utils/factory/auth-factory.util';
import { validatePasswords } from '../utils/validators/validate-password';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export interface RawSignUp {
  email       : string;
  username    : string;
  password    : string;
}

export class SignUpDTO implements RawSignUp {
  public username     : string;
  public email        : string;
  public password     : string;

  constructor(options: RawSignUp) {
    this.username   = options.username;
    this.email      = options.email;
    this.password   = options.password;
  }
}

const signUpControls: Record<string, FormControlOptions> = {
  "email": {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  },
  "username": {
    validators: [Validators.required],
    nonNullable: true
  },
  "password": {
    validators: [Validators.required],
    nonNullable: true,
  },
  "confirmPassword": {
    validators: [Validators.required],
    nonNullable: true,
  }
}

export class SignUpForm<T = SignUpDTO> implements AuthForm<T> {

  private auth = inject(AuthService)

  dto   !: T;
  form  !: FormGroup;

  constructor() { this.init(); }

  private init() {

    this.form = new FormGroup(
      {
        email: new FormControl<string>('', signUpControls["email"]),
        username: new FormControl<string>('', signUpControls["username"]),
        password: new FormControl<string>('', signUpControls["password"]),
        confirmPassword: new FormControl<string>('', signUpControls["confirmPassword"]),
      },
      { validators: validatePasswords }
    );
  }

  public submit() {
    return this.auth.signUpUser(new SignUpDTO(this.form.value))
  }
}
