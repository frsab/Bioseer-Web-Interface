import { Component, OnInit } from '@angular/core';
import {BingApiLoaderService} from '../_services/bing-api-loader.service';
import {SensorBroadcastModel} from '../_models/sensor-broadcast.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mapLoaded = false;
  sensors: Observable<[SensorBroadcastModel]>; // All Loaded Sensors

  // ------------------------------

  // Blank Data for practice
  practiceData1: SensorBroadcastModel = {
    sensorId: '123kjfkeaf32q',
    sensorName: '10A',
    ownerId: '134feafeafea',
    startTime: '20080915T155300', // ISO 8601
    endTime: '20080915T155600',
    location: [
      {
      lat: 41.49971231510167,
      long: -72.99581850473526
      },
      {
        lat: 41.59971231510167,
        long: -73
      },
      {
        lat: 41.47971231510167,
        long: -71.89581850473526
      },
      {
        lat: 41.46971231510167,
        long: -71.85581850473526
      }
    ], // 4 point array to draw out bounding box
    currentLocation: {
      lat: 41.49871231510167,
      long: -72.95581850473526
    },
    zoneID: 'fjkjkeawj321q4',
    zoneName: '10A',
    status: 'Good',
    dataRaw: undefined,
    dataSegmented: undefined,
    dataSpecies: undefined
  };
  practiceData2: SensorBroadcastModel = {
    sensorId: '123kjfkeaf32q',
    sensorName: 'Sensor 10B',
    ownerId: '134feafeafea',
    startTime: '20080915T155300', // ISO 8601
    endTime: '20080915T155600',
    location: [
      {
        lat: 41.49971231510167,
        long: -72.99581850473526
      },
      {
        lat: 41.59971231510167,
        long: -73
      },
      {
        lat: 41.47971231510167,
        long: -71.89581850473526
      },
      {
        lat: 41.46971231510167,
        long: -71.85581850473526
      }
    ], // 4 point array to draw out bounding box
    currentLocation: {
      lat: 41.48871231510167,
      long: -72.95581850473526
    },
    zoneID: 'fjkjkeawj321q4',
    zoneName: '10A',
    status: 'Good',
    dataRaw: undefined,
    dataSegmented: undefined,
    dataSpecies: undefined
  };

  // ------------------------------

  constructor(
    private bingApiLoader: BingApiLoaderService,
  ) {
    this.bingApiLoader.load().then(() => {
      this.mapLoaded = true;
    });
  }

  ngOnInit() {
    // TODO Replace with API Call to get Sensors
    this.sensors = new Observable(subscriber => {
      subscriber.next([this.practiceData1]);
      setTimeout(() => {
        subscriber.next([this.practiceData2]);
      }, 10000);
    });
  }

}
