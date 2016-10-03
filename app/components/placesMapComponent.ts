/**
 * Created by jose on 28/09/16.
 */
import { Component, Inject } from '@angular/core'
import { PlacesService } from '../services/PlacesService'
import { TagsService } from '../services/TagsService'

@Component({
    selector: 'places-map',
    templateUrl: './app/components/templates/placesMapComponentTemplate.html',
    providers: [PlacesService, TagsService]
})
export class PlacesMapComponent {
    zoom: number = 5
    
    latitude: number = 40.3208445
    longitude: number = -3.852209700000003

    originalPlaces: place[]

    markers: marker[] = []

    clickedPlace: place

    constructor(@Inject(PlacesService) private placesService:PlacesService,
                @Inject(TagsService) private tagsService:TagsService)
    {
        this.getOriginalPlaces()
        this.getMarkers(this.originalPlaces)
    }
    
    private clickedMarker(label: string, index: number) {
        let auxMarker

        this.placesService.getPlaceById( this.originalPlaces[index].id ).subscribe(
            (data) => {
                auxMarker = data.json();
            },
            (error) => {
                console.log(error);
            }
        )

        for (let tagId of auxMarker.tags) {
            let tagName = ''

            this.tagsService.getTagById(tagId).subscribe(
                (data) => {
                    tagName = data.json().name;
                },
                (error) => {
                    console.log(error);
                }
            )

            this.clickedPlace.tags.push(tagName)
        }
    }

    private mapClicked($event: MouseEvent) {
        /*this.markers.push({
            latitude: $event.coords.lat,
            longitude: $event.coords.lng
        })*/
    }

    private getMarkers(placesList: place[]) {
        for (let place of placesList) {
            let placeMark = {
                latitude: place.latitude,
                longitude: place.longitude,
                draggable: false
            }

            this.markers.push(placeMark)
        }
    }

    private getOriginalPlaces() {
        let places = []

        this.placesService.getPlaces().subscribe(
            (data) => {
                places = data.json().places;
            },
            (error) => {
                console.log(error);
            }
        )

        for (let place of places) {
            let placeAux = {
                id: place.id,
                latitude: Number(place.coordinates.latitude),
                longitude: Number(place.coordinates.longitude),
                name: place.name,
                lactose: place.lactose,
                review: place.review,
                url: place.review,
                tags: place.tags
            }

            this.originalPlaces.push(placeAux)
        }
    }
}

interface marker {
    latitude: number
    longitude: number
    label?: string
    draggable?: boolean
}

export interface place {
    id: number
    latitude: number
    longitude: number
    name: string
    lactose: boolean
    review: string
    url: string
    tags: string[]
}
