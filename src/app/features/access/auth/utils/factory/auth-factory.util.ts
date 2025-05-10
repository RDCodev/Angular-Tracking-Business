
import { Optional, Signal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SignInForm } from "@features/access/auth/models/sign-in.model";
import { SignUpForm } from '@features/access/auth/models/sign-up.model';
import { AuthResponse } from "@supabase/supabase-js";
import type { FormControlStatus } from '@angular/forms';

export interface AuthForm<T, H = string> {
  dto     : T;
  form    : FormGroup;
  statusChange : Signal<FormControlStatus | undefined>

  submit(cb?: (...args: H[]) => void): Promise<string>;
  
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