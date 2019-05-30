import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// TODO Implement Routes

// const appRoutes: Routes = [
//   {
//     path: '',
//     component: AppMod,
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];
//
// export const routing = RouterModule.forRoot(appRoutes)
export class AppRoutingModule { }
