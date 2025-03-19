import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NewslettersComponent } from "./newsletters/newsletters.component";
import { CommonModule } from "@angular/common";
import { BreakPointsService } from "@core/services/breakpoints.service";
import { MainLayout } from "@layouts/home/main.component";
import { MatTabsModule } from "@angular/material/tabs";

interface TabRoute {
  name: string;
  link: string;
  active: boolean;
}

const accessTabs: TabRoute[] = [
  { name: 'Sign In', link: 'sign-in', active: false },
  { name: 'Sign Up', link: 'sign-up', active: false }
]

@Component({
  selector: 'kmx-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MainLayout,
    RouterModule,
    NewslettersComponent,
    CommonModule,
    MatTabsModule,
  ]
})
export class AccessComponent {

  private readonly _breakpoints = inject(BreakPointsService);

  public tabs = accessTabs;
  public observer = this._breakpoints.observer;

  public _activeTab = signal(this.tabs[0]);

  set activeTab(tab: TabRoute) {
    this._activeTab.set(tab)
  }

  get activeTab() {
    return this._activeTab()
  }

}