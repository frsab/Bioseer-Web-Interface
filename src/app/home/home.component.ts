import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router){
  }

  ngOnInit() {
    if ((navigator.userAgent.indexOf('iPhone') !== -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') !== -1)) {
      this.router.navigate(['mobilehome']);
    }
    if (screen.width <= 699) {
      this.router.navigate(['mobilehome']);
    }
  }

}
