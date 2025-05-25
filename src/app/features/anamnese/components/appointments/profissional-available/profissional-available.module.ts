import { NgModule } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {ProfissionalAvailableRoutingModule} from "./profissional-available-routing.module";
import {ProfissionalAvailableComponent} from "./profissional-available.component";



@NgModule({
  declarations: [ProfissionalAvailableComponent],
  imports: [
    SharedModule,
    ProfissionalAvailableRoutingModule
  ]
})
export class ProfissionalAvailableModule { }
