import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'access',
    title: 'Sign In',
    loadComponent: () => import('@features/access/access.component').then(mod => mod.AccessComponent),
  }, {
    path: 'profile',
    title: 'Profile',
    loadComponent: () => import('@features/profile/profile.component').then(mod => mod.ProfileComponent)
  }
];
