
import { FormGroup } from "@angular/forms";
import { SignInForm } from "@features/access/login/models/sign-in.model";
import { SignUpForm } from '@features/access/login/models/sign-up.model';
import { AuthResponse } from "@supabase/supabase-js";

export interface AccessForm<T> {
  dto     : T;
  form    : FormGroup;

  validate(cb?: (dto: T) => void): void;
  submit(cb: (res: AuthResponse) => void): void;
}

export abstract class FormCreator<T>{
  abstract createForm(): T;
}

export class SignInFormCreator extends FormCreator<SignInForm> {
  createForm() {
    return new SignInForm(); 
  }
}

export class SignUpFormCreator extends FormCreator<SignUpForm> {
  createForm() {
    return new SignUpForm();
  }
}