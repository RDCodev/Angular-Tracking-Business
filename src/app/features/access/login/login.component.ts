import { ChangeDetectionStrategy, Component, effect, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input"
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { AccessForms, AccessSignInForm, AccessSignUpForm, Form } from "./utils/access-factory.util";

type TabOptions = 'sign-in' | 'sign-up';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent { 

  private readonly formBuilder = inject(FormBuilder);
  private form: Form | undefined;

  constructor() { }

  onTabChange({ tab }: MatTabChangeEvent) {    
    
    if (tab.ariaLabel === 'Sign In') 
      this.initAccessForm(new AccessSignInForm());

    if (tab.ariaLabel === 'Sign Up') 
      this.initAccessForm(new AccessSignUpForm());

  }

  initAccessForm(access: AccessForms) {
    this.form = access.createForm();
  }
  
}