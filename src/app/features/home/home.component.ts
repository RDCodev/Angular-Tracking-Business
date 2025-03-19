import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'kmx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent { }