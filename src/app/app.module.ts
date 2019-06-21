import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule, InputsModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SiteConditionsService} from './_services/site-conditions.service';
import {WINDOW_PROVIDERS} from './_services/window.service';
import {BingApiLoaderService} from './_services/bing-api-loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/user.module';
import {StaticPagesModule} from './static-pages/static-pages.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {MaterialModule} from './shared/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    UploadImagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlimLoadingBarModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    StaticPagesModule,
    DashboardModule,
    ButtonsModule.forRoot(),
    InputsModule.forRoot()
  ],
  exports: [
    MaterialModule
  ],
  bootstrap: [AppComponent],
  providers: [
    SiteConditionsService,
    WINDOW_PROVIDERS,
    BingApiLoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

  ]
})
export class AppModule { }
