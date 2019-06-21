import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorpageComponent} from './errorpage/errorpage.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from './material/material.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AppRoutingModule} from '../app-routing.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/**
 * General components across the application
 */
@NgModule({
  declarations: [
    ErrorpageComponent,
    FileUploadComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    PerfectScrollbarModule,
  ],
  exports: [
    ErrorpageComponent,
    FileUploadComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
