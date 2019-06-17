import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {SidebarService} from '../sidebar/sidebar.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  transparentBackground: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public sidebarservice: SidebarService
  ) {
    this.router.events.subscribe(res => {
       this.router.url === '/' ? this.transparentBackground = true : this.transparentBackground = false;
    });
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      // console.log(user);
      user ? this.displayName = user.firstName + ' ' + user.lastName : this.displayName = undefined;
    });
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
