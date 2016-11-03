import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { PlacesListComponent, PlacesMapComponent, PlacesHelpComponent } from './index';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MaterialModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    PlacesListComponent,
    PlacesMapComponent,
    PlacesHelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjuKhx_vuFiovS_xuNN0ARd0Fj8koFwMk'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
