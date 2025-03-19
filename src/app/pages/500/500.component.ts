import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: '500-page',
  templateUrl: './500.component.html',
  styleUrls: ['./500.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerErrorPage { }