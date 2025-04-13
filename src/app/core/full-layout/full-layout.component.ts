import { Component } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent{
  isCollapsed = false;
  isAuthorized = false
  userName = "";
  userNameInitials = "";
  userEmail = "";
  userGravatarImg: string = '';



  logout(): void {
    console.log('bateu em deslogar')

  }
}
