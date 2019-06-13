import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { SiteConditionsService } from '../../_services/site-conditions.service';
import {SensorBroadcastModel} from '../../_models/sensor-broadcast.model';
import {group} from '@angular/animations';
import {BingMapsService} from '../../_services/bing-maps.service';
import {ZoneModel} from '../../_models/zone.model';

// Needed to reference typescript for microsoft object
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

/**
 * Component for creating bing maps centered on the coordinates given from the service
 */
@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent implements OnChanges, AfterViewInit  {

  @Input() sensors: Observable<[SensorBroadcastModel]>;
  @Input() zones: Observable<[ZoneModel]>;

  // References bingMap on the DOM
  @ViewChild('bingMap') streetsideMapViewChild: ElementRef;

  /**
   * Gets center of the map
   * @returns Center of map
   */
  get center() {
    return this.service.center$;
  }

  // @ts-ignore
  map: Microsoft.Maps.Map;
  // @ts-ignore
  position: Microsoft.Maps.Location;

  // Output log, printed in the html
  log: string[] = [];

  constructor(
    private service: SiteConditionsService,
    private bingMaps: BingMapsService
  ) {
    this.log.push('Constructor');
  }

  ngOnChanges() {
    this.log.push('OnChanges');
  }

  /**
   * Creates streestide map, sets coordinates
   * Subscribes to current sensors and updates pushpins
   */
  ngAfterViewInit() {
    this.log.push('AfterViewInit');
    this.createMap();
    this.service.center$.pipe(
      // Filters out what it wants, no empty coordinates, take only one
      filter(coords => !!coords),
      take(1)
    ).subscribe(coords => {
      const [lat, lon] = coords;
      console.log(`Got coords from service: ${coords}`);
      // @ts-ignore
      // Creates microsoft position object with the lat and lon from the services
      const position = new Microsoft.Maps.Location(lat, lon);
      // Sets view of streetside map
      this.map.setView({ center: position });
      console.log(`current Center: ${this.map.getCenter()}`);
    });

    // Subscribe to Inputs and create markers
    if (this.sensors) {
      this.sensors.subscribe((currentSensor: [SensorBroadcastModel]) => {
        for (const i of Object.keys(currentSensor)) {
          const selectedSensor: SensorBroadcastModel = currentSensor[i];
          // If already on the map, update position, else add a new pushpin
          this.bingMaps.handlePushPin(selectedSensor.currentLocation.lat, selectedSensor.currentLocation.long, selectedSensor.sensorId, selectedSensor.sensorName, this.map);
        }
      });
    }

    if (this.zones) {
      this.zones.subscribe((currentZones: [ZoneModel]) => {
        for (let i of Object.keys(currentZones)) {
          const selectedZone: ZoneModel = currentZones[i];
          this.bingMaps.handleRectangle(selectedZone.location, selectedZone.zoneHealth, this.map);
        }
      })
    }

    // let locations = this.bingMaps.createArrayOfLocations([38.618394, -121.305682, 38.617571, -121.305246, 38.617477, -121.305792, 38.618365, -121.306204])
    // this.bingMaps.createRectangle(locations, 'rgba(78, 244, 66, .4)', 'white', 5, this.map)
  }

  /**
   * Creates streetside maps using Microsoft maps object
   */
  createMap() {
    // @ts-ignore
    this.map = new Microsoft.Maps.Map(
      this.streetsideMapViewChild.nativeElement,
      {
        // @ts-ignore
        credentials: 'AukHSv0yxiZQnvbYs4szic5RfGEmKxhaSLCmRZ5PV8UmgQWI11uH2Mo5_sWDh8l8',
        // @ts-ignore
        center: new Microsoft.Maps.Location(38.616070, -121.304723),
        // @ts-ignore
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 15
      }
    );
    // @ts-ignore
    // Microsoft.Maps.Events.addHandler(this.map, 'viewchange', (e) => {
    //   console.log(this.map.getCenter());
    // });
  }
}

