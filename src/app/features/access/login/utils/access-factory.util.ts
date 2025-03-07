import { FormGroup } from "@angular/forms";
import { SignInDTO, SignInForm } from "@features/access/login/models/sign-in.model";
import { SignUpDTO, SignUpForm } from '@features/access/login/models/sign-up.model';

export interface AccessForm {
  dto: SignInDTO | SignUpDTO;
  form: FormGroup;
  ctrls: any;
  submit(): void;
}

export abstract class FormCreator {
  abstract createForm(): AccessForm
}

export class SignInFormCreator extends FormCreator {
  createForm(): AccessForm {
    return new SignInForm();
  }
}

export class SignUpFormCreator extends FormCreator {
  createForm(): AccessForm {
    return new SignUpForm();
  }
}