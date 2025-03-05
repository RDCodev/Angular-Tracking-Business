import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "@layouts/home/home.component";
import { LoginComponent } from "./login/login.component";
import { NewslettersComponent } from "./newsletters/newsletters.component";
import { CommonModule } from "@angular/common";
import { BreakPointsService } from "@core/services/breakpoints.service";

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HomeComponent,
    RouterModule,
    LoginComponent,
    NewslettersComponent
  ]
})
export class AccessComponent {

  private readonly _breakpoints = inject(BreakPointsService);

  public observer = this._breakpoints.observer;

}