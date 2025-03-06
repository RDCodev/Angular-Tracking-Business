import { SignInDTO } from "@features/access/login/models/sign-in.model";
import { SignUpDTO } from '@features/access/login/models/sign-up.model';

export abstract class AccessForms {
  abstract createForm(): Form
}

export class AccessSignInForm extends AccessForms {
  createForm(): Form {
    return new SignInForm();
  }
}

export class AccessSignUpForm extends AccessForms {
  createForm(): Form {
    return new SignUpForm();
  }
}

export interface Form {
  submit(): void;
}

export class SignInForm implements Form {
  submit(): void {
    console.log('[Submit] - Sign In Form');
  }
}

export class SignUpForm implements Form {
  submit(): void {
    console.log('[Submit] - Sign Up Form');
  }
}
