import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule,
  MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AutocompletePipe } from './autocomplete.pipe';
import { ConvertCaloriesPipe, MyCurrencyPipe, MyDatePipe, SafeHtmlPipe } from './pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,

    SafeHtmlPipe,
    AutocompletePipe,
    MyDatePipe,
    MyCurrencyPipe,
    ConvertCaloriesPipe,
  ],
  exports: [
    SafeHtmlPipe,
    AutocompletePipe,
    MyDatePipe,
    MyCurrencyPipe,
    ConvertCaloriesPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
