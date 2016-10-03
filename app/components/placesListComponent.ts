/**
 * Created by jose on 25/09/16.
 */
import { Component, Inject } from '@angular/core';
import { PlacesService } from '../services/PlacesService';

@Component(
    {
        selector: 'places-list',
        templateUrl: './app/components/templates/placesListComponentTemplate.html',
        providers: [PlacesService]
    }
)
export class PlacesListComponent {
    private places: any[];

    constructor(@Inject(PlacesService) private placesService:PlacesService) {}

    getPlaces() {
        this.placesService.getPlaces().subscribe(
            (data) => {
                this.places = data.json().places;
            },
            (error) => {
                console.log(error);
            }
        )
    }
}