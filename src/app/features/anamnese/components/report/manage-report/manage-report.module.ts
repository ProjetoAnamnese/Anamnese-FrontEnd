import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {ManageReportComponent} from "./manage-report.component";
import {ManageReportRoutingModule} from "./manage-report-routing.module";
import {NgxMaskDirective} from "ngx-mask";



@NgModule({
  declarations: [ManageReportComponent],
  imports: [
    SharedModule,
    ManageReportRoutingModule,
    NgxMaskDirective
  ]
})
export class ManageReportModule { }
