import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {OurmissionComponent} from './ourmission/ourmission.component';
import {OurtechnologyComponent} from './ourtechnology/ourtechnology.component';
import {AboutUsComponent} from './aboutus/about-us.component';
import {MaterialModule} from '../shared/material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    OurmissionComponent,
    OurtechnologyComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class StaticPagesModule { }
