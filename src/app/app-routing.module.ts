import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {HomeComponent} from './static-pages/home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './user/login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {EditAccountComponent} from './user/edit-account/edit-account.component';
import {UploadImagesComponent} from './upload-images/upload-images.component';
import {RegisterComponent} from './user/register/register.component';
import {MobiledashboardComponent} from './dashboard/mobiledashboard/mobiledashboard.component';
import {OurmissionComponent} from './static-pages/ourmission/ourmission.component';
import {OurtechnologyComponent} from './static-pages/ourtechnology/ourtechnology.component';
import {AboutUsComponent} from './static-pages/aboutus/about-us.component';
import {ErrorpageComponent} from './shared/errorpage/errorpage.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'edit-account',
    component: EditAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upload-images',
    component: UploadImagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'mobiledashboard',
    component: MobiledashboardComponent,
  },
  {
    path: 'team',
    component: AboutUsComponent,
  },
  {
    path: 'mission',
    component: OurmissionComponent,
  },
  {
    path: 'ourtechnology',
    component: OurtechnologyComponent,
  },
  {
    path: 'error',
    component: ErrorpageComponent,
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
