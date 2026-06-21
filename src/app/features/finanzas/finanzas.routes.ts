import { Routes } from '@angular/router';
import { DashboardComponent } from '../../shared/components/layout/dashboard/dashboard';

export const FINANZAS_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'lista', loadComponent: () => import('./components/finanza-list/finanza-list').then(m => m.FinanzaList) },
      { path: 'crear', loadComponent: () => import('./components/finanza-create/finanza-create').then(m => m.FinanzaCreateComponent) },
      { path: 'editar/:id', loadComponent: () => import('./components/finanza-form/finanza-form').then(m => m.FinanzaForm) },
      { path: 'finanzas/detalle/:id', loadComponent: () => import('./components/finanzas-detail/finanzas-detail') .then(m => m.FinanzaDetailComponent) },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  }
];