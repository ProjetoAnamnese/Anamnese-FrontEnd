import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreatePacientComponent} from "./create-pacient.component";



const routes: Routes = [
  {path: "", component: CreatePacientComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePacientRoutingModule { }
