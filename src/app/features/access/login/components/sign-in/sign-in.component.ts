import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AccessForm, FormCreator, SignInFormCreator } from '../../utils/access-factory.util';

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
    ReactiveFormsModule,
  ],
})
export class SignInComponent implements OnInit {

  public accessForm!: AccessForm;

  get signInForm(): FormGroup {
    return this.accessForm.form;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.initAccessForm(new SignInFormCreator());
  }

  private initAccessForm(creator: FormCreator) {
    this.accessForm = creator.createForm();
  }
}
