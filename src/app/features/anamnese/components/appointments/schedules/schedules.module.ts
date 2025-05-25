import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {SchedulesComponent} from "./schedules.component";
import {SchedulesRoutingModule} from "./schedules-routing.module";



@NgModule({
  declarations: [SchedulesComponent],
  imports: [
    SharedModule,
    SchedulesRoutingModule,

  ]
})
export class SchedulesModule { }
