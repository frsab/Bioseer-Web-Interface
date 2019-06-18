import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../sidebar/sidebar.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  transparentBackground: boolean;
  positionAbsolute: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sidebarservice: SidebarService
  ) {
    this.router.events.subscribe(res => {
       this.router.url === '/' || this.router.url === '/mission' ? this.transparentBackground = true : this.transparentBackground = false;
       this.router.url === '/error' || this.router.url === '/login' || this.router.url === '/register' ? this.positionAbsolute = true : this.positionAbsolute = false;
       if (NavigationEnd) {
         this.hideSidebar();
       }
    });
  }

  ngOnInit() {
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
