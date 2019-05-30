import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BingMapComponent } from './dashboard/bing-map/bing-map.component';
import {SiteConditionsService} from './services/site-conditions.service';
import {WINDOW_PROVIDERS} from './services/window.service';
import {BingApiLoaderService} from './services/bing-api-loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material/material.module';
import { MapOverlayComponent } from './dashboard/map-overlay/map-overlay.component';
import { OverviewComponent } from './dashboard/map-overlay/overview/overview.component';
import { GroupComponent } from './dashboard/map-overlay/group/group.component';
import { MapSettingsComponent } from './dashboard/map-overlay/map-settings/map-settings.component';
import { GeneralCardsComponent } from './dashboard/map-overlay/group/general-cards/general-cards.component';
import { DataComponent } from './dashboard/map-overlay/group/data/data.component';
import { SettingsComponent } from './dashboard/map-overlay/group/settings/settings.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {fakeBackendProvider} from './helpers/fake-backend';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BingMapComponent,
    MapOverlayComponent,
    OverviewComponent,
    GroupComponent,
    MapSettingsComponent,
    GeneralCardsComponent,
    DataComponent,
    SettingsComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlimLoadingBarModule
  ],
  bootstrap: [AppComponent],
  providers: [
    SiteConditionsService,
    WINDOW_PROVIDERS,
    BingApiLoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    fakeBackendProvider]
})
export class AppModule { }
