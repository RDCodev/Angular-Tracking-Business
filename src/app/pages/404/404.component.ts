import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'page-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPage { }