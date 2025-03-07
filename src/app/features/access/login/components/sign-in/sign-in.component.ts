import { ChangeDetectionStrategy, Component, effect, EnvironmentInjector, inject, OnInit, runInInjectionContext, Signal } from '@angular/core';
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

  private readonly envInjector = inject(EnvironmentInjector);
  private readonly _supabase = inject(SupabaseService);

  private accessForm!: AccessForm;
  
  public signInForm!: FormGroup;
  public singInSubmit!: any;
  public signInFormChanges!: Signal<void>;

  constructor() { 
    effect(() => {
      console.log('[Effect] - ', this.signInFormChanges());
    });

    console.log(this._supabase);
  }
  
  ngOnInit(): void {    
    this.initializeForm();
  }

  get username() {
    return this.signInForm.controls['username'];
  }

  get password() {
    return this.signInForm.controls['password'];
  }

  private initializeForm() {
    this.initAccessForm(new SignInFormCreator());
  }

  private initAccessForm(creator: FormCreator) {
    runInInjectionContext(this.envInjector, () => {
      this.accessForm = creator.createForm();

      this.signInForm = this.accessForm.form;
      this.signInFormChanges = toSignal(this.signInForm.valueChanges);

    });
  }

  public submit() {
    this.accessForm.validate((param: any) => console.log('[Submit] - ', param));
  }
}
