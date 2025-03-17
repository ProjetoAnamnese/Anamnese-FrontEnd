import { NgModule } from '@angular/core';
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {SharedModule} from "../../../../../shared/shared.module";
import {CreateUserComponent} from "../../components/create-user/create-user.component";



@NgModule({
  declarations: [LoginComponent, CreateUserComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
