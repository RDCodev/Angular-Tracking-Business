
import { FormGroup } from "@angular/forms";
import { SignInForm } from "@features/access/auth/models/sign-in.model";
import { SignUpForm } from '@features/access/auth/models/sign-up.model';
import { AuthResponse } from "@supabase/supabase-js";

export interface AuthForm<T> {
  dto     : T;
  form    : FormGroup;

  submit(cb?: (res: AuthResponse) => void): Promise<string>;
  
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