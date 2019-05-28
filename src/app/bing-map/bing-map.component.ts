import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { SiteConditionsService } from '../services/site-conditions.service';

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
  streetsideMap: Microsoft.Maps.Map;
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
   */
  ngAfterViewInit() {
    this.log.push('AfterViewInit');
    this.createStreetSideMap();
    this.service.center$.pipe(
      // Filters out what it wants, no empty coordinates, take only one
      filter(coords => !!coords),
      take(1)
    ).subscribe(coords => {
      const [lat, lon] = coords;
      this.log.push(`Got coords from service: ${coords}`);
      // @ts-ignore
      // Creates microsoft position object with the lat and lon from the service
      const position = new Microsoft.Maps.Location(lat, lon);
      // Sets view of streetside map
      this.streetsideMap.setView({ center: position });
      this.log.push(`current Center: ${this.streetsideMap.getCenter()}`);
    });
  }

  /**
   * Creates streetside maps using Microsoft maps object
   */
  createStreetSideMap() {
    // @ts-ignore
    this.streetsideMap = new Microsoft.Maps.Map(
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
  }

  /**
   * Returns whether or not the log exists, if it does, it'll be printed
   */
  hasLogEntries() {
    return this.log.length > 0;
  }
}

