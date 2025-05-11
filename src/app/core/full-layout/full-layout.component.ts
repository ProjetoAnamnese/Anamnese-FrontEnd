import {Component, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {AuthService} from "../../features/anamnese/auth/service/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {
  isCollapsed = false;
  isAuthorized = false
  userName !: string;
  userNameInitials = "";
  userEmail = "";
  userGravatarImg: string = '';


  constructor(private cookieService: CookieService, private authService: AuthService, private modalService: NzModalService) {}

  ngOnInit(): void {
    const userInfo = this.cookieService.get("USER_NAME");
    if (userInfo) {
      this.userName = userInfo
      this.userNameInitials = this.userName
        .toUpperCase()
        .replace(/DE /g, "")
        .replace(/DA /g, "")
        .replace(/DO /g, "")
        .replace(/DOS /g, "")
        .replace(/DAS /g, "")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substr(0, 2);
    }
  }
  logout(): void {
    this.modalService.confirm({
      nzTitle: "Sair",
      nzContent: "Desja mesmo sair do sistema?",
      nzOnOk: () => {
        this.authService.logout()
      }
    });

  }
}
