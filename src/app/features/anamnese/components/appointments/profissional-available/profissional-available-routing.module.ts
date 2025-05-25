import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfissionalAvailableComponent} from "./profissional-available.component";


const routes: Routes = [
  {path: "", component: ProfissionalAvailableComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionalAvailableRoutingModule { }
