import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../../_services/sidebar.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router} from '@angular/router';

// import { MenusService } from './menus.service';

/**
 * Popout sidebar with animations
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = []; // Menus that are being created
  displayName: string; // Current user

  /**
   * Gets the list of menus from the constructor
   * @param sidebarservice Sidebar service referenfce
   * @param authenticationService Auth service reference
   * @param router Router reference
   */
  constructor(
    public sidebarservice: SidebarService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.menus = sidebarservice.getMenuList();
  }

  /**
   * Sets displayName to current user
   */
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      // console.log(user);
      user ? this.displayName = user.firstName + ' ' + user.lastName : this.displayName = undefined;
    });
  }

  /**
   * Logs user out
   */
  logout() {
    this.authenticationService.logout();
  }

  /**
   * Gets current state of sidebar
   */
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  /**
   * Toggles submenus
   * @param currentMenu Current referenced menu item
   */
  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }


}
