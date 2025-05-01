import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullLayoutComponent} from "./core/full-layout/full-layout.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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

  },

  {
    path: "404",
    component: NotFoundComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
