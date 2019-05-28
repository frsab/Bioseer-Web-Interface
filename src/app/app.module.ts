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

@NgModule({
  declarations: [
    AppComponent,
    BingMapComponent,
    MapOverlayComponent
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
