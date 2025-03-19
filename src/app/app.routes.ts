import { Route } from '@angular/router';
import { NotFoundPage } from './pages/404/404.component';
import { AccessComponent } from '@features/access/access.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AccessComponent,
    children: [
      {
        path: 'sign-in',
        title: 'Sign In',
        loadComponent: () => import('@features/access/auth/components/sign-in/sign-in.component').then(mod => mod.SignInComponent)
      },
      {
        path: 'sign-up',
        title: 'Sign Up',
        loadComponent: () => import('@features/access/auth/components/sign-up/sign-up.component').then(mod => mod.SignUpComponent)
      },
    ]
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('@features/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'profile',
    title: 'Profile',
    loadComponent: () => import('@features/profile/profile.component').then(mod => mod.ProfileComponent)
  },
  {
    path: '**',
    title: 'Not Found',
    component: NotFoundPage
  }
];
