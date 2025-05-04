import { NgModule } from '@angular/core';
import {CreatePacientComponent} from "./create-pacient.component";
import {SharedModule} from "../../../../../shared/shared.module";
import {CreatePacientRoutingModule} from "./create-pacient-routing.module";



@NgModule({
  declarations: [CreatePacientComponent],
  imports: [
    SharedModule,
    CreatePacientRoutingModule
  ]
})
export class CreatePacientModule { }
