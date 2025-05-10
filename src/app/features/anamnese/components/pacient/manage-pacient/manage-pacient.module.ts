import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {NgxMaskDirective} from "ngx-mask";
import {ManagePacientComponent} from "./manage-pacient.component";
import {ManagePacientRoutingModule} from "./manage-pacient-routing.module";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";




@NgModule({
  declarations: [ManagePacientComponent],
  imports: [
    SharedModule,
    ManagePacientRoutingModule,
    NgxMaskDirective,
    NzDescriptionsModule
  ]
})
export class ManagePacientModule { }
