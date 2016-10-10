/**
 * Created by jose on 28/09/16.
 */
import { Component, Inject } from '@angular/core'
import { PlacesService } from '../services/PlacesService'
import { TagsService } from '../services/TagsService'
import { CurrentLocationService } from '../services/CurrentLocationService'

@Component({
    selector: 'places-map',
    styles: [`.sebm-google-map-container {
                height: 700px;
             }`
    ],
    templateUrl: './app/components/templates/placesMapComponentTemplate.html',
    providers: [PlacesService, TagsService, CurrentLocationService]
})
export class PlacesMapComponent {
    zoom: number = 14
    
    lat: number = 40.3208445
    lng: number = -3.852209700000003

    originalPlaces: place[] = []

    markers: marker[] = []

    tags: string[]

    constructor(@Inject(PlacesService) private placesService:PlacesService,
                @Inject(TagsService) private tagsService:TagsService,
                @Inject(CurrentLocationService) private currentLocationService:CurrentLocationService)
    {
        this.getOriginalPlaces()
        this.getMarkers(this.originalPlaces)
        this.getTags()

        this.currentLocationService.getCurrentLocation().subscribe((
            (data) => {
                let position = data.json().location
                this.lat = position.lat
                this.lng = position.lng
            },
            (error) => {
                console.log(error)
            }
        )
        )
    }

    private clickedPlace(index: number): void {
        if (this.originalPlaces[index].tagsNames.length == 0) {
            for (let tagId of this.originalPlaces[index].tags) {
                this.tagsService.getTagById(tagId).subscribe(
                    (data) => {
                        this.originalPlaces[index].tagsNames.push(data.json().name)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            }
        }
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
                        tags: place.tags,
                        tagsNames: []
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
    tagsNames?: string[]
}
