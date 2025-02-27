import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { NewslettersComponent } from "./newsletters/newsletters.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoginComponent,
    NewslettersComponent
  ]
})
export class HomeComponent { 
  
}