import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullLayoutComponent} from "./core/full-layout/full-layout.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {AuthService} from "./features/anamnese/auth/service/auth.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/anamnese/auth/pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '', component: FullLayoutComponent, canActivate: [AuthService], children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/anamnese/components/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'create-pacient',
        loadChildren: () => import('./features/anamnese/components/pacient/create-pacient/create-pacient.module').then(m => m.CreatePacientModule),
      },
      {
        path: 'manage-pacient',
        loadChildren: () => import('./features/anamnese/components/pacient/manage-pacient/manage-pacient.module').then(m => m.ManagePacientModule),
      },
      {
        path: 'create-report',
        loadChildren: () => import('./features/anamnese/components/report/create-report/create-report.module').then(m => m.CreateReportModule),
      },
      {
        path: 'manage-report',
        loadChildren: () => import('./features/anamnese/components/report/manage-report/manage-report.module').then(m => m.ManageReportModule),
      },
      {
        path: 'profissional-available',
        loadChildren: () => import('./features/anamnese/components/appointments/profissional-available/profissional-available.module').then(m => m.ProfissionalAvailableModule),
      },
      {
        path: 'schedules',
        loadChildren: () => import('./features/anamnese/components/appointments/schedules/schedules.module').then(m => m.SchedulesModule),
      }


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
