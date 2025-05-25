import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {NgxMaskDirective} from "ngx-mask";
import {ManagePacientComponent} from "./manage-pacient.component";
import {ManagePacientRoutingModule} from "./manage-pacient-routing.module";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";




@NgModule({
  declarations: [ManagePacientComponent],
    imports: [
        SharedModule,
        ManagePacientRoutingModule,
        NgxMaskDirective,
        NzDescriptionsModule,
        NzTimePickerModule
    ]
})
export class ManagePacientModule { }
