import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
    },
    {
      path: 'history',
      loadComponent: () => import('./pages/history/history').then(m => m.HistoryComponent),
    },
    {
      path: 'actuators',
      loadComponent: () => import('./pages/actionneurs/actionneurs').then(m => m.ActionneursComponent),
    }
];
