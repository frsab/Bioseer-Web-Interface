import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap, take, delay } from 'rxjs/operators';

/**
 * Conditions of coordinates, mocks getting coordinates from HTTP service
 */
@Injectable()
export class SiteConditionsService {
  center: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([41.49871231510167, -72.95581850473526]); // doesn't work

  center$ = this.center.asObservable(); // Reference {@link BingMapComponent}

  /**
   * Run on program startup, gets initial center and sets it to center$
   */
  constructor() {
    // this.route.params.pipe(
    //   take(1),
    //   switchMap(params => this.getInitialCenter(+params.id))
    // ).subscribe(initialCenter => {
    //   this.center.next(initialCenter);
    // });
    this.getInitialCenter(0).subscribe(initialCenter => {
      this.center.next(initialCenter);
    });
  }

  /**
   * Mocks getting HTTP data
   * @param reportId would be id for http request
   * @returns The center as a promise
   */
  getInitialCenter(reportId): Observable<number[]> {
    // would come from HTTP service
    const center = [41.49871231510167, -72.95581850473526];
    return from<number[]>([center]).pipe(delay(2000));
  }
}
