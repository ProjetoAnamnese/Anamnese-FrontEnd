import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // so pra teste de tela de login por enquanto
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/anamnese/auth/pages/login/login.module').then(m => m.LoginModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
