import {Component} from '@angular/core'
import {Inject} from '@angular/core'
import {PlacesService} from './PlacesService'

@Component({
    selector: 'places',
    template: `
        <div>
            <ul>
                <button (click)="getPlaces()">Show places</button>
                <div *ngIf="places">
                    <li *ngFor='let place of places'>
                        {{place.name}}
                    </li>                
                </div>
            </ul>
        </div>
    `,
    providers: [PlacesService]
})
export class PlacesComponent {
    places:any

    constructor(@Inject(PlacesService) private placesService:PlacesService){}

    getPlaces() {
        this.placesService.getPlaces().subscribe(
            (data) => {
                this.places = data.json()
            },
            (error) => {
                console.log(error)
            }
        )
        console.log('PLACES')
    }
}