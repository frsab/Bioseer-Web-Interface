import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { SiteConditionsService } from '../../_services/site-conditions.service';
import {SensorBroadcastModel} from '../../_models/sensor-broadcast.model';
import {group} from '@angular/animations';

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
      this.sensors.subscribe((currentSensor: [SensorBroadcastModel]) => {
        for (const i of Object.keys(currentSensor)) {
          const selectedSensor: SensorBroadcastModel = currentSensor[i];
          // If already on the map, update position, else add a new pushpin
          this.handlePushPin(selectedSensor.currentLocation.lat, selectedSensor.currentLocation.long, selectedSensor.sensorId, selectedSensor.sensorName);
        }
      });
    }

    let locations = this.createArrayOfLocations([38.618394, -121.305682, 38.617571, -121.305246, 38.617477, -121.305792, 38.618365, -121.306204])
    this.createRectangle(locations, 'rgba(78, 244, 66, .4)', 'white', 5)
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

    // Create an SVG string of a circle with the specified radius and color, iunjects sensor ID into circle
    // language=HTML
    const svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
      '" height="', (radius * 2), '"><circle cx="', radius, '" cy="', radius, '" r="',
      (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/>' +
      '<text x="18" y="43" font-family="sans-serif" font-size="20" fill="black" font-weight="900">' + sensorName + '</text>' +
      '</svg>'];

    // Create a pushpin from the SVG and anchor it to the center of the circle.
    // @ts-ignore
    return new Microsoft.Maps.Pushpin(location, {
      title: sensorName,
      subTitle: sensorId,
      icon: svg.join(''),
      // @ts-ignore
      anchor: new Microsoft.Maps.Point(radius, radius),
      // htmlContent: '<h1>Test</h1>'
    });
  }

  // @ts-ignore
  createRectangle(location: Array<Microsoft.Maps.Location>, fillColor, strokeColor, strokeWidth) {
    // @ts-ignore
    const polygon = new Microsoft.Maps.Polygon(location, {
      fillColor: fillColor,
      strokeColor: strokeColor,
      strokeThickness: strokeWidth
    });
    this.map.entities.push(polygon)
  }

  createArrayOfLocations(location: Array<number>) {
    let groupsOfCoordinates: Array<Array<number>> = [];
    // @ts-ignore
    let groupsOfLocations: Array<any> = [];
    for (let i = 0; i < location.length; i+=2) {
      groupsOfCoordinates.push(location.slice(i, i+2));
    }
    for (let i = 0; i < groupsOfCoordinates.length; i++) {
      // @ts-ignore
      groupsOfLocations.push(new Microsoft.Maps.Location(groupsOfCoordinates[i][0], groupsOfCoordinates[i][1]))
    }
    return groupsOfLocations;
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
    const pin = this.createCirclePushpin(location, 35, 'rgb(252, 252, 252)', 'rgb(96, 96, 96)', 8, sensorName, pushpinID);
    this.map.entities.push(pin);
  }
}

