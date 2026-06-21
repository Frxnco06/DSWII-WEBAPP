import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  {
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent) 
  },


  
{ 
  path: 'finanzas', 
  loadComponent: () => import('./shared/components/layout/dashboard/dashboard').then(m => m.DashboardComponent),
  children: [
   { 
      path: '', 
      loadComponent: () => import('./features/finanzas/components/finanza-main/finanza-main').then(m => m.FinanzaMainComponent) 
    },
    { 
      path: 'lista', 
      loadComponent: () => import('./features/finanzas/components/finanza-list/finanza-list').then(m => m.FinanzaList) 
    },
    { 
        path: 'detalle/:id', 
        loadComponent: () => import('./features/finanzas/components/finanzas-detail/finanzas-detail').then(m => m.FinanzaDetailComponent) 
      },
      { 
        path: 'editar/:id', 
        loadComponent: () => import('./features/finanzas/components/finanza-edit/finanza-edit').then(m => m.FinanzaEditComponent) 
      },
      {
        path: 'crear',
        loadComponent: () => import('./features/finanzas/components/finanza-create/finanza-create').then(m => m.FinanzaCreateComponent) 
      }
  ]
},
  { path: '**', redirectTo: 'login' }
];