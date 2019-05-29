import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatCardModule, MatCheckboxModule,
  MatDividerModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatOptionModule, MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    MatOptionModule,
    MatListModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MaterialModule { }
