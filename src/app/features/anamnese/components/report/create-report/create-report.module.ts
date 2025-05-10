import { NgModule } from '@angular/core';
import {CreateReportRoutingModule} from "./create-report-routing.module";
import {SharedModule} from "../../../../../shared/shared.module";
import {CreateReportComponent} from "./create-report.component";



@NgModule({
  declarations: [CreateReportComponent],
  imports: [
    SharedModule,
    CreateReportRoutingModule
  ]
})
export class CreateReportModule { }
