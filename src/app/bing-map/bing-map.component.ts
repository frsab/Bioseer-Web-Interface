import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import { SiteConditionsService } from '../services/site-conditions.service';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent implements OnChanges, AfterViewInit  {

  @ViewChild('streetsideMap') streetsideMapViewChild: ElementRef;

  get center() {
    return this.service.center$;
  }

  // @ts-ignore
  streetsideMap: Microsoft.Maps.Map;
  // @ts-ignore
  position: Microsoft.Maps.Location;

  log: string[] = [];

  constructor(private service: SiteConditionsService) {
    this.log.push('Constructor');
  }

  ngOnChanges() {
    this.log.push('OnChanges');
  }

  ngAfterViewInit() {
    this.log.push('AfterViewInit');
    this.createStreetSideMap();
    this.service.center$.pipe(
      filter(coords => !!coords),
      take(1)
    ).subscribe(coords => {
      const [lat, lon] = coords;
      this.log.push(`Got coords from service: ${coords}`);
      // @ts-ignore
      const position = new Microsoft.Maps.Location(lat, lon);
      this.streetsideMap.setView({ center: position });
      this.log.push(`current Center: ${this.streetsideMap.getCenter()}`);
    });
  }

  createStreetSideMap() {
    // @ts-ignore
    this.streetsideMap = new Microsoft.Maps.Map(
      this.streetsideMapViewChild.nativeElement,
      {
        // @ts-ignore
        mapTypeId: Microsoft.Maps.MapTypeId.streetside,
        streetsideOptions: {
          // @ts-ignore
          overviewMapMode: Microsoft.Maps.OverviewMapMode.hidden,
          showExitButton: false
        }
      }
    );
  }

  hasLogEntries() {
    return this.log.length > 0;
  }
}

