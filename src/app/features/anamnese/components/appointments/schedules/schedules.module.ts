import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {SchedulesComponent} from "./schedules.component";
import {SchedulesRoutingModule} from "./schedules-routing.module";
import {NgxMaskDirective} from "ngx-mask";



@NgModule({
  declarations: [SchedulesComponent],
  imports: [
    SharedModule,
    SchedulesRoutingModule,
    NgxMaskDirective,

  ]
})
export class SchedulesModule { }
