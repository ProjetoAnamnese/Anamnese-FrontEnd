import { NgModule } from '@angular/core';
import {CreateReportRoutingModule} from "./create-report-routing.module";
import {SharedModule} from "../../../../../shared/shared.module";
import {CreateReportComponent} from "./create-report.component";
import {NgxMaskDirective} from "ngx-mask";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";



@NgModule({
  declarations: [CreateReportComponent],
  imports: [
    SharedModule,
    CreateReportRoutingModule,
    NzCheckboxModule,
    NgxMaskDirective
  ]
})
export class CreateReportModule { }
