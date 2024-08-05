import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';

import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loginGuard } from './core/guards/login/login.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
