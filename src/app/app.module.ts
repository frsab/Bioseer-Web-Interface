import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BingMapComponent } from './bing-map/bing-map.component';
import {SiteConditionsService} from './services/site-conditions.service';
import {WINDOW_PROVIDERS} from './services/window.service';
import {BingApiLoaderService} from './services/bing-api-loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material/material.module';
import { MapOverlayComponent } from './map-overlay/map-overlay.component';
import { OverviewComponent } from './map-overlay/overview/overview.component';
import { GroupComponent } from './map-overlay/group/group.component';
import { MapSettingsComponent } from './map-overlay/map-settings/map-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    BingMapComponent,
    MapOverlayComponent,
    OverviewComponent,
    GroupComponent,
    MapSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  bootstrap: [AppComponent],
  providers: [ SiteConditionsService, WINDOW_PROVIDERS, BingApiLoaderService ]
})
export class AppModule { }
