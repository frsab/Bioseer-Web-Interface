import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditAccountComponent} from './edit-account/edit-account.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../shared/material/material.module';

@NgModule({
  declarations: [
    EditAccountComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UserModule { }
