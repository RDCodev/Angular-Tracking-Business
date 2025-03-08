import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AccessForm, FormCreator, SignUpFormCreator } from '../../utils/access-factory.util';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class SignUpComponent implements OnInit {

  private accessForm!: AccessForm;

  public hide = signal(true);

  public usernameError = computed<string>(() => {

    if(this.username.valid) return "";

    switch(this.username.errors) {
      case ["required"]:
        return "Username is required";
      
      default:
        return "Username is invalid";
    }

  });

  public passwordError = computed<string>(() => {

    if(this.password.valid) return "";

    switch(this.password.errors) {
      case ["required"]:
        return "Password is required";
      
      default:
        return "Password is invalid";
    }
  });

  public confirmPasswordError = computed<string>(() => {
    if(this.confirmPassword.valid) return "";

    switch(this.confirmPassword.errors) {
      case ["required"]:
        return "Confirm Password is required";
      
      default:
        return "Confirm Password is invalid";
    }
  })

  constructor() { }

  ngOnInit(): void {
    this.initAccessForm(new SignUpFormCreator());
  }

  get signUpForm() {
    return this.accessForm.form;
  }

  get firstName() {
    return this.signUpForm.controls["firstName"];
  }

  get lastName() {
    return this.signUpForm.controls["lastName"];
  }

  get username() {
    return this.signUpForm.controls["username"];
  }

  get password() {
    return this.signUpForm.controls["password"];
  }

  get confirmPassword() {
    return this.signUpForm.controls["confirmPassword"];
  }

  private initAccessForm(creator: FormCreator) {
    this.accessForm = creator.createForm();
  }

  public onHidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
