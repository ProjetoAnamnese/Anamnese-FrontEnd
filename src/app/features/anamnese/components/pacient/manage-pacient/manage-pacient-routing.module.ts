import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ManagePacientComponent} from "./manage-pacient.component";



const routes: Routes = [
  {path: "", component: ManagePacientComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePacientRoutingModule { }
