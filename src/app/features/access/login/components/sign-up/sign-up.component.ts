import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
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

  private initAccessForm(creator: FormCreator) {
    this.accessForm = creator.createForm();
  }

  public onHidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
