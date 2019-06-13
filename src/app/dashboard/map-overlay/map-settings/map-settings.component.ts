import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {observable, Observable, Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.scss']
})
export class MapSettingsComponent implements OnInit {
  @Output() mapSettings: EventEmitter<mapSettings> = new EventEmitter();
  @Output() newZone: EventEmitter<boolean> = new EventEmitter();

  mapSettingsForm: FormGroup;

  // TODO Make a form builder for this
  constructor() {
    this.mapSettingsForm = new FormGroup({
      zoneView: new FormControl(1),
      sensors: new FormControl(false),
      mobileBuoys: new FormControl(false),
      temperatureMap: new FormControl(false),
      waterQualityMap: new FormControl(false),
      phMap: new FormControl(false),
      satellite: new FormControl(false),
    });
    this.onChanges()
  }

  ngOnInit() {
    this.mapSettingsForm.getRawValue();
  }

  onChanges(): void {
    this.mapSettingsForm.valueChanges.subscribe(val => {
      this.mapSettings.emit(val);
    })
  }

  addZone() {
    this.newZone.emit(true);
  }

}

export class mapSettings {
  zoneView: number;
  sensors: boolean;
  mobileBuoys: boolean;
  temperatureMap: boolean;
  waterQualityMap: boolean;
  phMap: boolean;
  satellite: boolean;
}
