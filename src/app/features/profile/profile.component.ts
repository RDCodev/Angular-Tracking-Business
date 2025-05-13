import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MainLayout } from "@layouts/home/main.component";

@Component({
    selector: 'kmx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MainLayout,
        NgOptimizedImage,
        CommonModule
    ]
})
export class ProfileComponent { }