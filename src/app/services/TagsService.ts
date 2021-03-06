/**
 * Created by jose on 28/09/16.
 */
import {Http, Response} from '@angular/http'
import {Inject} from '@angular/core'
import {Observable} from 'rxjs/Observable'

export class TagsService {
    constructor(@Inject(Http) private http:Http) {}

    getTags():Observable<Response> {
        return this.http.get('https://places.api.jvm16.xyz:3001/tags/')
    }

    getTagById(id: string):Observable<Response> {
        return this.http.get('https://places.api.jvm16.xyz:3001/tags/' + id)
    }
}

