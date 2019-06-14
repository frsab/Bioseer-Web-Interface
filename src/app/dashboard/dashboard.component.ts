import {Component, Input, OnInit} from '@angular/core';
import {BingApiLoaderService} from '../_services/bing-api-loader.service';
import {SensorBroadcastModel} from '../_models/sensor-broadcast.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ZoneModel} from '../_models/zone.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapLoaded = false;
  sensors: Observable<Array<SensorBroadcastModel>>; // All Loaded Sensors
  zones: Observable<Array<ZoneModel>>;
  onlineSensors: number;
  warningSensors: number;
  offlineSensors: number;
  onlineMobileBuoys: number;
  warningMobileBuoys: number;
  offlineMobileBuoys: number;
  totalGroups: number;
  totalZones: number;

  // Blank Data for practice
  practiceData1: SensorBroadcastModel = {
    sensorId: '1',
    sensorName: '1A',
    ownerId: 'caelinsutch',
    currentLocation: {
      lat: 38.616,
      long: -121.304
    },
    imageData: undefined,
    zoneID: '1',
    status: 'Good',
  };
  practiceData2: SensorBroadcastModel = {
    sensorId: '2',
    sensorName: '2A',
    ownerId: 'caelinsutch',
    currentLocation: {
      lat: 38.61382,
      long: -121.30376
    },
    imageData: undefined,
    zoneID: '2',
    status: 'Good',
  };

  practiceZoneData1: ZoneModel = {
    zoneHealth: 'good',
    zoneId: '1',
    zoneName: '1',
    location: [38.615847, -121.303725, 38.615137, -121.304004, 38.617477, -121.305792, 38.618365, -121.306204, 38.618394, -121.305682, 38.617571, -121.305246,  ]
  };
  practiceZoneData2: ZoneModel = {
    zoneHealth: 'average',
    zoneId: '2',
    zoneName: '2',
    location: [
      38.615587564962745, -121.30335599884867,
      38.6142, -121.3032,
      38.6130, -121.3037,
      38.6119, -121.3043,
      38.6107, -121.3051,
      38.6093, -121.3065,
      38.6097, -121.3072,
      38.6122, -121.3048,
      38.6140, -121.3038,
      38.6150, -121.3037,
    ]
  };

  // ------------------------------

  constructor(
    private router: Router, private bingApiLoader: BingApiLoaderService,
  ) {
    this.bingApiLoader.load().then(() => {
      this.mapLoaded = true;
    });
  }

  ngOnInit() {
    if ((navigator.userAgent.indexOf('iPhone') !== -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') !== -1)) {
      this.router.navigate(['mobiledashboard']);
    }
    if (screen.width <= 699) {
      this.router.navigate(['mobiledashboard']);
    }

    const exampleSensor = [this.practiceData1, this.practiceData2];
    const exampleZone = [this.practiceZoneData1, this.practiceZoneData2]

    // TODO Replace with API Call to get Sensors
    this.sensors = new Observable(subscriber => {
      subscriber.next(exampleSensor);
      const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
      };
      setInterval(() => {
        this.practiceData1.currentLocation.lat += getRandomNumber(-.00001, .00001);
        this.practiceData2.currentLocation.lat += getRandomNumber(-.00001, .00001);
        this.practiceData1.currentLocation.long += getRandomNumber(-.00001, .00001);
        this.practiceData2.currentLocation.long += getRandomNumber(-.00001, .00001);
        subscriber.next([this.practiceData1, this.practiceData2]);
      }, 1000);
    });

    this.zones = new Observable(subscriber => {
      subscriber.next(exampleZone);
      subscriber.complete();
    });
  }

  mapSettings(event) {
    console.log(event);
  }

  newZone(event) {
    console.log(event);
  }

}
