import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {ProfissionalAvailableRoutingModule} from "./profissional-available-routing.module";
import {ProfissionalAvailableComponent} from "./profissional-available.component";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";



@NgModule({
  declarations: [ProfissionalAvailableComponent],
  imports: [
    SharedModule,
    ProfissionalAvailableRoutingModule,
    NzTimePickerModule
  ]
})
export class ProfissionalAvailableModule { }
