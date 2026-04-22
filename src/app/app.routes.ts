import { Routes } from '@angular/router';
//import { DashboardPage } from './gifs/pages/dashboard-page/dashboard-page';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),
  },
  {
    path: '**',
    redirectTo:'dashboard',
  }
];
