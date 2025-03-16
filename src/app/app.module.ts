import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { NZ_I18N, pt_BR } from "ng-zorro-antd/i18n";

import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { GooglePlusOutline} from '@ant-design/icons-angular/icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NzIconModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_ICONS, useValue: [GooglePlusOutline] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
