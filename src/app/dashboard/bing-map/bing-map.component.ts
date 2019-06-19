import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { SiteConditionsService } from '../../_services/site-conditions.service';
import {SensorBroadcastModel} from '../../_models/sensor-broadcast.model';
import {BingMapsService} from '../../_services/bing-maps.service';
import {ZoneModel} from '../../_models/zone.model';
import {Observable} from 'rxjs';

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
export class BingMapComponent implements AfterViewInit  {

  /**
   * Declare inputs for sensors and zones
   */
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
  map: Microsoft.Maps.Map; // Creates Microsoft Maps instance
  // @ts-ignore
  position: Microsoft.Maps.Location; // Creates microsoft position instance

  // Output log, printed in the html
  log: string[] = [];

  constructor(
    private service: SiteConditionsService,
    private bingMaps: BingMapsService
  ) {
  }

  /**
   * Creates streestide map, sets coordinates
   * Subscribes to current sensors and updates pushpins
   */
  ngAfterViewInit() {
    this.createMap();
    // this.service.center$.pipe(
    //   // Filters out what it wants, no empty coordinates, take only one
    //   filter(coords => !!coords),
    //   take(1)
    // ).subscribe(coords => {
    //   const [lat, lon] = coords;
    //   console.log(`Got coords from service: ${coords}`);
    //   // @ts-ignore
    //   // Creates microsoft position object with the lat and lon from the services
    //   const position = new Microsoft.Maps.Location(lat, lon);
    //   // Sets view of streetside map
    //   this.map.setView({ center: position });
    //   console.log(`current Center: ${this.map.getCenter()}`);
    // });

    // Add Click Handler
    // @ts-ignore
    Microsoft.Maps.Events.addHandler(this.map, 'click', (e) => {
      // @ts-ignore
      const point = new Microsoft.Maps.Point(e.getX(), e.getY());
      const loc = e.target.tryPixelToLocation(point);
      console.log(loc);
    });

    // Subscribe to Inputs and create markers
    if (this.sensors) {
      // If there are sensors being inputed, subscribe to it
      this.sensors.subscribe((currentSensor: [SensorBroadcastModel]) => {
        for (const i of Object.keys(currentSensor)) {
          const selectedSensor: SensorBroadcastModel = currentSensor[i];
          // If already on the map, update position, else add a new pushpin
          this.bingMaps.handleSensor(selectedSensor.currentLocation.lat, selectedSensor.currentLocation.long, selectedSensor.sensorId, selectedSensor.sensorName, this.map);
        }
      });
    }

    // If zones are passed in, create zones on map
    if (this.zones) {
      this.zones.subscribe((currentZones: [ZoneModel]) => {
        for (let i of Object.keys(currentZones)) {
          const selectedZone: ZoneModel = currentZones[i];
          this.bingMaps.handleZone(selectedZone.location, selectedZone.zoneHealth, this.map, selectedZone.zoneName, selectedZone.zoneId);
        }
      });
    }

    // let locations = this.bingMaps.createArrayOfLocations([38.618394, -121.305682, 38.617571, -121.305246, 38.617477, -121.305792, 38.618365, -121.306204])
    // this.bingMaps.createRectangle(locations, 'rgba(78, 244, 66, .4)', 'white', 5, this.map)
  }

  /**
   * Creates map using Microsoft maps object
   */
  createMap() {
    // @ts-ignore
    this.map = new Microsoft.Maps.Map(
      this.streetsideMapViewChild.nativeElement,
      {
        // @ts-ignore
        credentials: 'AukHSv0yxiZQnvbYs4szic5RfGEmKxhaSLCmRZ5PV8UmgQWI11uH2Mo5_sWDh8l8',  // User key
        // @ts-ignore
        center: new Microsoft.Maps.Location(38.616070, -121.304723), // Spawn center
        // @ts-ignore
        mapTypeId: Microsoft.Maps.MapTypeId.aerial, // Type of map
        zoom: 17
      }
    );
  }
}

