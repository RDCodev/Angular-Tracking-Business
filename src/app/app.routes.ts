import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'access',
    title: 'access',
    loadComponent: () => import('@features/access/access.component').then(mod => mod.AccessComponent),
  }
];
