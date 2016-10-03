/**
 * Created by jose on 25/09/16.
 */
import { NgModule, Type }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { PlacesListComponent } from './components/placesListComponent'
import { PlacesMapComponent } from './components/placesMapComponent'
import { AppComponent } from './app.component'
import { AgmCoreModule } from 'angular2-google-maps/core'

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAjuKhx_vuFiovS_xuNN0ARd0Fj8koFwMk'
        })
    ],
    declarations: [ AppComponent, PlacesListComponent, PlacesMapComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule extends Type { }
