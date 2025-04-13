import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import {NZ_DATE_LOCALE, NZ_I18N, pt_BR} from "ng-zorro-antd/i18n";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { ptBR } from "date-fns/locale";
import {MessageService} from "./shared/services/message.service";
import {FullLayoutModule} from "./core/full-layout/full-layout.module";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    FullLayoutModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_DATE_LOCALE, useValue: ptBR },
    { provide: LOCALE_ID, useValue: "pt-BR" },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
