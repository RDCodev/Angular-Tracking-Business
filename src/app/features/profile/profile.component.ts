import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MainLayout } from "@layouts/home/main.component";

@Component({
    selector: 'kmx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MainLayout,
        NgOptimizedImage,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class ProfileComponent { }