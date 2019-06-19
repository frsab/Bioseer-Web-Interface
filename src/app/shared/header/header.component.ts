import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../_services/sidebar.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

/**
 * Webpage header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  transparentBackground: boolean; // If the header has a trans background
  positionAbsolute: boolean; // If the header is in position absolute

  /**
   * Checks if the
   * @param router Router object
   * @param sidebarService Sidebar service reference
   */
  constructor(
    private router: Router,
    public sidebarService: SidebarService
  ) {
    // Subscribe to router events, checks if route is going to be a transparent header or absolute position header
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


  /**
   * Toggles sidebar
   */
  toggleSidebar() {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState());
  }

  /**
   * Hides sidebar
   */
  hideSidebar() {
    this.sidebarService.setSidebarState(true);
  }

}
