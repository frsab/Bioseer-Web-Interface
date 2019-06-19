import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {BingMapComponent} from './bing-map/bing-map.component';
import {MobiledashboardComponent} from './mobiledashboard/mobiledashboard.component';
import {MaterialModule} from '../shared/material/material.module';
import {OverviewComponent} from './map-overlay/overview/overview.component';
import {MapSettingsComponent} from './map-overlay/map-settings/map-settings.component';
import {GroupComponent} from './map-overlay/group/group.component';
import {SettingsComponent} from './map-overlay/group/settings/settings.component';
import {GeneralCardsComponent} from './map-overlay/group/general-cards/general-cards.component';
import {DataComponent} from './map-overlay/group/data/data.component';

/**
 * Dashboard module for the sensor dashboard based on bing maps
 */
@NgModule({
  declarations: [
    DashboardComponent,
    BingMapComponent,
    MobiledashboardComponent,
    OverviewComponent,
    MapSettingsComponent,
    GroupComponent,
    SettingsComponent,
    GeneralCardsComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DashboardModule { }
