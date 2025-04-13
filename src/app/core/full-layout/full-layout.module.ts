import { NgModule } from '@angular/core';
import {FullLayoutComponent} from "./full-layout.component";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {NzTypographyModule} from "ng-zorro-antd/typography";



@NgModule({
  declarations: [FullLayoutComponent],
  imports: [
    NzBreadCrumbModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzAvatarModule,
    NzDropDownModule,
    NzModalModule,
    NzLayoutModule,
    RouterLink,
    NzToolTipModule,
    NzIconModule,
    RouterOutlet,
    NzButtonModule,
    NgIf,
    NgOptimizedImage,
    NgStyle,
    NzTypographyModule,
  ],
  exports: [FullLayoutComponent]

})
export class FullLayoutModule { }
