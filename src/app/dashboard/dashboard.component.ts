import { Component, OnInit } from '@angular/core';
import {BingApiLoaderService} from '../services/bing-api-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapLoaded = false;

  constructor(
    private bingApiLoader: BingApiLoaderService,
  ) {
    this.bingApiLoader.load().then(() => {
      console.log('map loaded');
      this.mapLoaded = true;
    });
  }

  ngOnInit() {
  }

}
