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
  path: 'productos',
  loadComponent: () => import('./shared/components/layout/dashboard/dashboard').then(m => m.DashboardComponent),
  children: [
   { 
      path: '', 
      loadComponent: () => import('./features/productos/components/producto-main/productos-main').then(m => m.ProductosMainComponent) 
    },
    {
      path: 'lista', 
      loadComponent: () => import('./features/productos/components/producto-list/producto-list').then(m => m.ProductoList) 
    },
    { 
        path: 'detalle/:id', 
        loadComponent: () => import('./features/productos/components/producto-detail/producto-detail').then(m => m.ProductoDetailComponent) 
      },
      { 
        path: 'editar/:id', 
        loadComponent: () => import('./features/productos/components/producto-edit/producto-edit').then(m => m.ProductoEditComponent) 
      },
      {
        path: 'crear',
        loadComponent: () => import('./features/productos/components/producto-create/producto-create').then(m => m.ProductoCreateComponent) 
      }
  ]
},

{
    path: 'evaluacion', 
    loadComponent: () => import('./shared/components/layout/dashboard/dashboard').then(m => m.DashboardComponent),
    children: [
      { 
        path: 'buscar', 
        loadComponent: () => import('./features/evaluaciones/components/evaluacion-buscar/evaluacion-buscar').then(m => m.EvaluacionBuscarComponent) 
      },
      { 
        path: 'resumen', 
        loadComponent: () => import('./features/evaluaciones/components/evaluacion-resultado/evaluacion-resultado').then(m => m.EvaluacionResultado) 
      },
       { 
        path: 'listado', 
        loadComponent: () => import('./features/evaluaciones/components/evaluacion-list/evaluacion-list').then(m => m.EvaluacionList) 
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];