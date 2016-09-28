/**
 * Created by jose on 25/09/16.
 */
import { NgModule, Type }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { PlacesListComponent } from './components/placesListComponent'
import { AppComponent } from './app.component'

@NgModule({
    imports:      [ BrowserModule, HttpModule ],
    declarations: [ AppComponent, PlacesListComponent],
    bootstrap: [ AppComponent ]
})
export class AppModule extends Type { }
