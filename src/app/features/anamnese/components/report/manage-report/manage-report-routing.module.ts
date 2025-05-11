import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ManageReportComponent} from "./manage-report.component";



const routes: Routes = [
  {path: "", component: ManageReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportRoutingModule { }
