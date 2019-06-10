import { Component, OnInit } from '@angular/core';
import {BingApiLoaderService} from '../services/bing-api-loader.service';
import {SensorModel} from '../models/sensor.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapLoaded = false;
  sensors: [SensorModel]; // All Loaded Sensors

  constructor(
    private bingApiLoader: BingApiLoaderService,
  ) {
    this.bingApiLoader.load().then(() => {
      console.log('map loaded');
      this.mapLoaded = true;
    });
  }

  ngOnInit() {
    // TODO Replace with API Call to get Sensors

  }

}
