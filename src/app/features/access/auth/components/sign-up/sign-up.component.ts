import { ChangeDetectionStrategy, Component, computed, effect, EnvironmentInjector, inject, OnInit, runInInjectionContext, Signal, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { SupabaseService } from '@core/services/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthForm, FormCreator, SignUpFormCreator } from '../../utils/factory/auth-factory.util';
import { SignUpDTO, SignUpForm } from '../../models/sign-up.model';

@Component({
  selector: 'kmx-sign-up',
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

  private readonly snackBar = inject(MatSnackBar);
  private readonly supabase = inject(SupabaseService);

  public accessForm !: AuthForm<SignUpDTO>;
  public signUpForm !: FormGroup;

  public confirmPassChanges !: Signal<any>;
  
  public usernameError = computed<string>(() => {

    const errors = this.username.errors;

    if(this.username.valid && !errors) return "";

    switch(true) {
      case errors?.["required"]:
        return "Username is required";
      
      default:
        return "Username is invalid";
    }

  });

  public passwordError = computed<string>(() => {

    const errors = this.password.errors;

    if(this.password.valid && !errors) return "";

    switch(true) {
      case errors?.["required"]:
        return "Password is required";
      
      default:
        return "Password is invalid";
    }
  });

  public confirmPasswordError = computed<string>(() => {

    if (!this.confirmPassChanges()) return "";

    const errors = this.confirmPassword.errors;
    const isValid = this.confirmPassword.valid;
    
    if(isValid && !errors) return "";

    switch(true) {
      case errors?.["passwordMismatch"]:
        return "Password and Confirm Password must match";

      case errors?.["required"]:
        return "Confirm Password is required";
      
      default:
        return "Confirm Password is invalid";
    }
  })

  constructor() {
    this.initAccessForm(new SignUpFormCreator());
  }

  ngOnInit(): void { }

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

  get confirmPasswordChanges() {
    return toSignal(this.confirmPassword.valueChanges);
  }

  private initAccessForm(creator: FormCreator<SignUpForm>) {

    this.accessForm = creator.createForm();

    this.signUpForm = this.accessForm.form;
    this.confirmPassChanges = this.confirmPasswordChanges;
  }

  public onSubmit() {
    this.accessForm.submit()
      .then((msg) => console.log(msg))
      .catch((err) => console.log(err))
  }
}
