import { Component, OnInit } from '@angular/core';
import {BingApiLoaderService} from '../_services/bing-api-loader.service';
import {SensorBroadcastModel} from '../_models/sensor-broadcast.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router'
import {ZoneModel} from '../_models/zone.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapLoaded = false;
  sensors: Observable<[SensorBroadcastModel]>; // All Loaded Sensors
  zones: Observable<[ZoneModel]>;

  // Blank Data for practice
  practiceData1: SensorBroadcastModel = {
    sensorId: '123kjfkeaf32q',
    sensorName: '10A',
    ownerId: '134feafeafea',
    currentLocation: {
      lat: 41.49871231510167,
      long: -72.95581850473526
    },
    imageData: undefined,
    zoneID: 'fjkjkeawj321q4',
    status: 'Good',
  };
  practiceData2: SensorBroadcastModel = {
    sensorId: '123kjfkeaf32q',
    sensorName: '10A',
    ownerId: '134feafeafea',
    currentLocation: {
      lat: 41.59871231510167,
      long: -72.95581850473526
    },
    imageData: undefined,
    zoneID: 'fjkjkeawj321q4',
    status: 'Good',
  };

  practiceZoneData: ZoneModel = {
    zoneHealth: 'good',
    zoneId: '18942384923',
    zoneName: '10',
    location: [38.615847, -121.303725, 38.615137, -121.304004, 38.617477, -121.305792, 38.618365, -121.306204, 38.618394, -121.305682, 38.617571, -121.305246,  ]
  };

  // ------------------------------

  constructor(
    private router: Router, private bingApiLoader: BingApiLoaderService,
  ) {
    this.bingApiLoader.load().then(() => {
      this.mapLoaded = true;
    });
  }
  // mobiledetect(){
  //
  // }

  ngOnInit() {
    if (screen.width <= 699) {
      this.router.navigate(['mobiledashboard']);
    }
    // TODO Replace with API Call to get Sensors
    this.sensors = new Observable(subscriber => {
      subscriber.next([this.practiceData1]);
      setTimeout(() => {
        subscriber.next([this.practiceData2]);
      }, 7000);
    });

    this.zones = new Observable(subscriber => {
      subscriber.next([this.practiceZoneData]);
    })
  }

}
