/**
 * Created by jose on 25/09/16.
 */
import {Http, Response} from '@angular/http';
import {Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { place } from '../components/placesMapComponent'

export class PlacesService {
    constructor(
        @Inject(Http) private http:Http
    ) {}

    getPlaces():Observable<Response> {
        return this.http.get('http://localhost:3002/places/');
    }

    getPlaceById(id: number) {
        return this.http.get('http://localhost:3002/places/' + id);
    }
}