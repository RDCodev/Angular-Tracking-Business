import { ChangeDetectionStrategy, Component, effect, inject } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { NewslettersComponent } from "./newsletters/newsletters.component";
import { BreakPointsService } from "@core/services/breakpoints.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LoginComponent,
    NewslettersComponent
  ]
})
export class HomeComponent { 
  
  private readonly _breakpoints = inject(BreakPointsService);

  public observer = this._breakpoints.observer;

  constructor() {
    effect(() => { }
    );
  }

}