import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'kmx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent { }