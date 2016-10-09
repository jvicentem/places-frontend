/**
 * Created by jose on 28/09/16.
 */
import { Component, Inject } from '@angular/core'
import { PlacesService } from '../services/PlacesService'
import { TagsService } from '../services/TagsService'

@Component({
    selector: 'places-map',
    styles: [`.sebm-google-map-container {
                height: 700px;
             }`
    ],
    templateUrl: './app/components/templates/placesMapComponentTemplate.html',
    providers: [PlacesService, TagsService]
})
export class PlacesMapComponent {
    zoom: number = 14
    
    lat: number = 40.3208445
    lng: number = -3.852209700000003

    originalPlaces: place[] = []

    markers: marker[] = []

    selectedPlace: place = {
        id: '',
        latitude: 0.000,
        longitude: 0.000,
        name: '',
        lactose: false,
        review: 'bad',
        url: '',
        tags: []
    }

    tags: string[]

    constructor(@Inject(PlacesService) private placesService:PlacesService,
                @Inject(TagsService) private tagsService:TagsService)
    {
        this.getOriginalPlaces()
        this.getMarkers(this.originalPlaces)
        this.getTags()

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.lat = position.coords.latitude
                this.lng = position.coords.longitude
            }
        )
    }

    private clickedPlace(label: string, index: number): void {
        let auxMarker

        this.placesService.getPlaceById( this.originalPlaces[index].id ).subscribe(
            (data) => {
                auxMarker = data.json()

                let tagsIds = auxMarker.tags.slice()

                this.selectedPlace = auxMarker

                this.selectedPlace.tags = []

                for (let tagId of tagsIds) {
                    this.tagsService.getTagById(tagId).subscribe(
                        (data) => {
                            this.selectedPlace.tags.push(data.json().name)
                        },
                        (error) => {
                            console.log(error)
                        }
                    )
                }

            },
            (error) => {
                console.log(error)
            }
        )
    }

    private getOriginalPlaces(): void {
        let places = []

        this.placesService.getPlaces().subscribe(
            (data) => {
                places = data.json().places;

                for (let place of places) {
                    let placeAux = {
                        id: place._id,
                        latitude: Number(place.coordinates.latitude),
                        longitude: Number(place.coordinates.longitude),
                        name: place.name,
                        lactose: place.lactose,
                        review: place.review,
                        url: place.url,
                        tags: place.tags
                    }

                    this.originalPlaces.push(placeAux)
                }
                this.originalPlaces

                this.getMarkers(this.originalPlaces)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    private getMarkers(placesList: place[]): void {
        for (let place of placesList) {
            let icon: string = ''

            const iconUrlFirstPart = './assets/'
            const iconUrlSecondPart = '-marker.png'

            switch (place.review) {
                case "good":
                    icon = 'green'
                    break;
                case "normal":
                    icon = 'orange'
                    break;
                default:
                    icon = 'blue'
            }

            let placeMark = {
                lat: place.latitude,
                lng: place.longitude,
                draggable: false,
                iconUrl: iconUrlFirstPart + icon + iconUrlSecondPart,
                label: ''
            }

            if (place.lactose)
                placeMark.label = 'L'

            this.markers.push(placeMark)
        }
    }

    private getTags(): void {
         this.tagsService.getTags().subscribe(
            (data) => {
                this.tags = data.json().tags;
            },
            (error) => {
                console.log(error);
            }
         )
    }

}

interface marker {
    lat: number
    lng: number
    label?: string
    draggable?: boolean
    iconUrl?: string
}

export interface place {
    id: string
    latitude: number
    longitude: number
    name: string
    lactose: boolean
    review: string
    url: string
    tags: string[]
}
