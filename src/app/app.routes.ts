import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('@ui/home/home.component').then(mod => mod.HomeComponent)
  }
];
