import { ChangeDetectionStrategy, Component, computed, EnvironmentInjector, inject, OnInit, runInInjectionContext } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthForm, FormCreator, SignInFormCreator } from '@features/access/auth/utils/factory/auth-factory.util';
import { SupabaseService } from '@core/services/supabase.service';
import { SignInDTO, SignInForm } from '@features/access/auth/models/sign-in.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kmx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class SignInComponent implements OnInit {

  private readonly snackbar = inject(MatSnackBar);

  private accessForm  !: AuthForm<SignInDTO>;
  public signInForm   !: FormGroup;

  public emailError = computed<string>(() => {

    const errors = this.email.errors;

    if (this.email.valid && !errors) return ""; 
      
    switch (true) {
      case errors?.["required"]:
        return "Email is required.";

      default:
        return "Email is invalid.";
    }
  });

  public passwordError = computed<string>(() => {

    const errors = this.password.errors;

    if (this.password.valid && !errors) return "";
      
    switch (true) {
      case errors?.["required"]:
        return "Password is required.";

      default:
        return "Password is invalid.";
    }
  });

  constructor() { 
    this.initAccessForm(new SignInFormCreator());
  }
  
  ngOnInit(): void { }

  get email() {
    return this.signInForm.controls['email'];
  }

  get password() {
    return this.signInForm.controls['password'];
  }

  private initAccessForm(creator: FormCreator<SignInForm>) {
    this.accessForm = creator.createForm();

    this.signInForm = this.accessForm.form;
  }

  public onSubmit() {
    this.accessForm.submit()
      .then((msg) => this.snackbar.open(msg))
      .catch((err) => this.snackbar.open(err))
  }
}
