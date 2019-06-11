import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayName: string;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      user ? this.displayName = user.firstName + ' ' + user.lastName : this.displayName = undefined;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
