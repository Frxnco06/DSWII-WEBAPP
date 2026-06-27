import { Routes } from '@angular/router';
import { DashboardComponent } from '../../shared/components/layout/dashboard/dashboard';

export const FINANZAS_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'lista', loadComponent: () => import('./components/producto-list/producto-list').then(m => m.ProductoList) },
      { path: 'crear', loadComponent: () => import('./components/producto-create/producto-create').then(m => m.ProductoCreateComponent) },
      { path: 'editar/:id', loadComponent: () => import('./components/producto-edit/producto-edit').then(m => m.ProductoEditComponent) },
      { path: 'productos/detalle/:id', loadComponent: () => import('./components/producto-detail/producto-detail') .then(m => m.ProductoDetailComponent) },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  }
];