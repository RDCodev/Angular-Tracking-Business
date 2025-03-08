import { ChangeDetectionStrategy, Component, computed, effect, EnvironmentInjector, inject, OnInit, runInInjectionContext, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { AccessForm, FormCreator, SignInFormCreator } from '@features/access/login/utils/access-factory.util';
import { SupabaseService } from '@core/services/supabase.service';

@Component({
  selector: 'app-sign-in',
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

  private readonly envInjector  = inject(EnvironmentInjector);
  private readonly supabase     = inject(SupabaseService);

  private accessForm  !: AccessForm;
  public signInForm   !: FormGroup;

  public usernameError = computed<string>(() => {

    if (this.username.valid) return ""; 
      
    switch (this.username.errors) {
      case ["required"]:
        return "Username is required.";

      default:
        return "Username is invalid.";
    }
  });

  public passwordError = computed<string>(() => {
    if (this.password.valid) return "";
      
    switch (this.password.errors) {
      case ["required"]:
        return "Password is required.";

      default:
        return "Password is invalid.";
    }
  });

  constructor() { }
  
  ngOnInit(): void {    
    this.initAccessForm(new SignInFormCreator());
  }

  get username() {
    return this.signInForm.controls['username'];
  }

  get password() {
    return this.signInForm.controls['password'];
  }

  private initAccessForm(creator: FormCreator) {
    runInInjectionContext(this.envInjector, () => {

      this.accessForm = creator.createForm();
      this.signInForm = this.accessForm.form;

    });
  }

  public submit() {
    
  }
}
