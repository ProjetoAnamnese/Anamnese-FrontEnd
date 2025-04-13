import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class DashboardModule { }
