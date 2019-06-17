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
    // if ((navigator.userAgent.indexOf('iPhone') !== -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') !== -1)) {
    //   this.router.navigate(['mobilehome']);
    // }
    // if (screen.width <= 699) {
    //   this.router.navigate(['mobilehome']);
    // }

    var buoy = document.createElement("img");
    var dashboard = document.createElement("img");
    var websiteheader = document.createElement("img");
    var rec = document.createElement("img");
    var water = document.createElement("img");

    var buoyimg = document.images[2]
    var dashboardimg = document.images[0]
    var recimg = document.images[1]

    buoy.onload = function() {
      buoyimg.src = this.src;
    };

    rec.onload = function() {
      recimg.src = this.src;
    };

    dashboard.onload = function() {
      dashboardimg.src = this.src;
    };

    websiteheader.onload = function() {
      document.getElementById("header").style.backgroundImage = this.src;
    };

    water.onload = function() {
      document.getElementById("lastsection").style.backgroundImage = this.src;
    };

    water.src = "https://firebasestorage.googleapis.com/v0/b/bioseer-c55f5.appspot.com/o/waterimage.jpg?alt=media&token=c2c816fb-20ca-46da-b06d-ea15d9d7071a";
    rec.src = "https://firebasestorage.googleapis.com/v0/b/bioseer-c55f5.appspot.com/o/imagerec.png?alt=media&token=ee66477b-5991-4878-b81a-0ce3f035e139";
    buoy.src = "https://firebasestorage.googleapis.com/v0/b/bioseer-c55f5.appspot.com/o/buoy.png?alt=media&token=53fb4e46-a51c-4b33-a990-c990f7f17a81";
    dashboard.src = "https://firebasestorage.googleapis.com/v0/b/bioseer-c55f5.appspot.com/o/dashboardscreenshot.jpg?alt=media&token=e0c57a1e-7b97-488f-90b4-80acf855211f";
    websiteheader.src = "https://firebasestorage.googleapis.com/v0/b/bioseer-c55f5.appspot.com/o/website-header.jpg?alt=media&token=7db462af-6fa4-45d1-a7f5-d5ca3fa681b1";
  }

}
