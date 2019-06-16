import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {SidebarService} from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayName: string;

  constructor(
    private authenticationService: AuthenticationService,
    public sidebarservice: SidebarService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      // console.log(user);
      user ? this.displayName = user.firstName + ' ' + user.lastName : this.displayName = undefined;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

}
