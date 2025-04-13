import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullLayoutComponent} from "./core/full-layout/full-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', // so pra teste de tela de login por enquanto
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/anamnese/auth/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '', component: FullLayoutComponent, children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/anamnese/components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
