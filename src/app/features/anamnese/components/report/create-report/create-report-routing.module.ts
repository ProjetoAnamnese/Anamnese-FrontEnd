import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateReportComponent} from "./create-report.component";



const routes: Routes = [
  {path: "", component: CreateReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateReportRoutingModule { }
