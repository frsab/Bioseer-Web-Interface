import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { SiteConditionsService } from '../../services/site-conditions.service';
import {SensorModel} from '../../models/sensor.model';

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

  @Input() sensors: Observable<[SensorModel]>;

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

  constructor(private service: SiteConditionsService) {
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
      // Creates microsoft position object with the lat and lon from the service
      const position = new Microsoft.Maps.Location(lat, lon);
      // Sets view of streetside map
      this.map.setView({ center: position });
      console.log(`current Center: ${this.map.getCenter()}`);
    });

    // Subscribe to Inputs and create markers
    if (this.sensors) {
      this.sensors.subscribe((currentSensor: [SensorModel]) => {
        for (const i of Object.keys(currentSensor)) {
          const selectedSensor: SensorModel = currentSensor[i];
          // If already on the map, update position, else add a new pushpin
          this.handlePushPin(selectedSensor.currentLocation.lat, selectedSensor.currentLocation.long, selectedSensor.sensorId, selectedSensor.sensorName);
        }
      });
    }
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
        center: new Microsoft.Maps.Location(51.50632, -0.12714),
        // @ts-ignore
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 10
      }
    );
    // @ts-ignore
    // Microsoft.Maps.Events.addHandler(this.map, 'viewchange', (e) => {
    //   console.log(this.map.getCenter());
    // });
  }

  /**
   * Creates a new circle pushpin
   * @param location Microsoft Maps Location Object
   * @param radius Radius in pixels of pushpin
   * @param fillColor Fillcolor in RBGA
   * @param strokeColor Stroke Color in black
   * @param strokeWidth Width of stroke
   * @param sensorName Name of sensor for title
   * @param sensorId ID of sensor for subtitle
   */
  // @ts-ignore
  createCirclePushpin(location: Microsoft.Maps.Location, radius, fillColor, strokeColor, strokeWidth, sensorName, sensorId) {
    strokeWidth = strokeWidth || 0;

    // Create an SVG string of a circle with the specified radius and color.
    const svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
      '" height="', (radius * 2), '"><circle cx="', radius, '" cy="', radius, '" r="',
      (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/></svg>'];

    // Create a pushpin from the SVG and anchor it to the center of the circle.
    // @ts-ignore
    return new Microsoft.Maps.Pushpin(location, {
      title: sensorName,
      subTitle: sensorId,
      icon: svg.join(''),
      // @ts-ignore
      anchor: new Microsoft.Maps.Point(radius, radius)
    });
  }

  /**
   * Update Pin Position Based on Sensor ID
   * @param coordX New x Coordinate
   * @param coordY new y coordinate
   * @param pushpinID SensorID
   * @param sensorName Name of the sensor
   */
  handlePushPin(coordX: number, coordY: number, pushpinID: string, sensorName: string) {
    for (let i = this.map.entities.getLength() - 1; i >= 0; i--) {
      const pushpin = this.map.entities.get(i);
      // @ts-ignore
      if (pushpin instanceof Microsoft.Maps.Pushpin && pushpin.getSubTitle() === String(pushpinID)) {
        // @ts-ignore
        pushpin.setLocation(new Microsoft.Maps.Location(coordX, coordY));
        return;
      }
    }

    // @ts-ignore
    const location = new Microsoft.Maps.Location(coordX, coordY);
    const pin = this.createCirclePushpin(location, 200, 'rgba(255, 255, 255, 0.8)', 'black', 2, sensorName, pushpinID);
    this.map.entities.push(pin);
  }
}

