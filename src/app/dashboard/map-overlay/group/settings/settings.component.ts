import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * Settings for zone
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['10A', '10B', '10C'];
  constructor() { }

  ngOnInit() {
  }



}
