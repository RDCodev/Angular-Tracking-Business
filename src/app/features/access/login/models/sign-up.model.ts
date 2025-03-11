import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccessForm } from "../utils/factory/access-factory.util";
import { validatePasswords } from "../utils/validators/validate-password";
import { PartialBy } from "@core/types/utils.types";

export interface RawSignUp {
  email: string;
  username: string;
  password: string;
  firstName: string | undefined;
  lastName: string | undefined;
}

export class SignUpDTO implements RawSignUp {

  public username: string;
  public email: string;
  public password: string;
  public firstName: string | undefined;
  public lastName: string | undefined;

  constructor(options: PartialBy<RawSignUp, 'firstName' | 'lastName'>) {
    this.username = options.username;
    this.email = options.email;
    this.password = options.password;
    this.firstName = options.firstName;
    this.lastName = options.lastName;
  }
  
}

export class SignUpForm implements AccessForm {

  dto   !: SignUpDTO;
  form  !: FormGroup;

  constructor() {
    this.init();
  }

  private init() {
    this.form = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        username: new FormControl('', { validators: [Validators.required] }),
        password: new FormControl('', { validators: [Validators.required]}),
        confirmPassword: new FormControl('', { validators: [Validators.required] })
      },
      { validators: validatePasswords }
    );
  }

  public validate(): void {
    console.log('[Submit] - Sign Up Form');
  }
}