import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccessForm } from "../utils/access-factory.util";

export interface RawSignUp {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
  password: string | undefined;
}

export class SignUpDTO implements RawSignUp {

  public firstName: string | undefined;
  public lastName: string | undefined;
  public username: string | undefined;
  public password: string | undefined;

  constructor(options: Partial<RawSignUp>) {
    this.firstName = options.firstName;
    this.lastName = options.lastName;
    this.username = options.username;
    this.password = options.password;
  }
  
}

export class SignUpForm implements AccessForm {

  dto!: SignUpDTO;
  form!: FormGroup;
  ctrls!: Record<string, AbstractControl>;

  constructor() {
    this.init();
  }

  private init() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.ctrls = this.form.controls;
  }

  public submit(): void {
    console.log('[Submit] - Sign Up Form');
  }
}