import {Http, Response} from '@angular/http'
import {Inject} from '@angular/core'
import {Observable} from 'rxjs/Observable'

export class PlacesService {

    constructor(
        @Inject(Http) private http:Http,
        @Inject('api') private api:string
    ){}

    getPlaces():Observable<Response> {
        return this.http.get(this.api + "places/")
    }
}