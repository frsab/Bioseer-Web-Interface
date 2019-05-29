import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatCheckboxModule,
  MatDividerModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatOptionModule, MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatOptionModule
  ]
})
export class MaterialModule { }
