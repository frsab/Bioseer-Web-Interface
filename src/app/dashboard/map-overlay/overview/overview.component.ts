/**
 * Overview Component, handles overview of user sensors, zones, etc.
 */
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() onlineSensors: number;
  @Input() warningSensors: number;
  @Input() offlineSensors: number;
  @Input() onlineMobileBuoys: number;
  @Input() warningMobileBuoys: number;
  @Input() offlineMobileBuoys: number;
  @Input() totalGroups: number;
  @Input() totalZones: number;

  constructor() { }

  ngOnInit() {
  }

}
