import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTabsModule,
  ]
})
export class LoginComponent { 

  get signInComponent() {
    return SignInComponent;
  }

  get signUpComponent() {
    return SignUpComponent;
  }

}