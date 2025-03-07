import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
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
  ],
})
export class SignUpComponent implements OnInit {

  public accessForm!: AccessForm;

  get signUpForm(): FormGroup {
    return this.accessForm.form;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.initAccessForm(new SignUpFormCreator());
  }

  private initAccessForm(creator: FormCreator) {
    this.accessForm = creator.createForm();
  }

}
