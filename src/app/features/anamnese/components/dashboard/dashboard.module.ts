import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {BaseChartDirective} from "ng2-charts";



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    BaseChartDirective,
  ]
})
export class DashboardModule { }
