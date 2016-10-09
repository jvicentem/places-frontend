/**
 * Created by jose on 25/09/16.
 */
import { Component, Inject } from '@angular/core';
import { PlacesService } from '../services/PlacesService';
import { TagsService } from '../services/TagsService';

@Component(
    {
        selector: 'places-list',
        templateUrl: './app/components/templates/placesListComponentTemplate.html',
        providers: [PlacesService, TagsService]
    }
)
export class PlacesListComponent {
    private places: any[]
    private tags = new Map()

    private showList: boolean

    constructor(@Inject(PlacesService) private placesService:PlacesService,
                @Inject(TagsService) private tagsService:TagsService) {
        this.fetchPlaces()
        this.tags = this.getTags()
        this.showList = false
    }

    showPlaces(): void {
        this.showList = (this.showList)? false : true
    }

    fetchPlaces(): void {
        this.placesService.getPlaces().subscribe(
            (data) => {
                this.places = data.json().places;
            },
            (error) => {
                console.log(error);
            }
        )
    }

    getTags(): Map {
        let tags = new Map()

        this.tagsService.getTags().subscribe(
            (data) => {
                let tagsJsonList = data.json().tags

                for (let tag of tagsJsonList) {
                    tags.set(tag._id, tag.name)
                }
            },
            (error) => {
                console.log(error)
            }
        )

        return tags
    }

    getTagsString(index: number): string {
        let tagsString: string = ''

        for (let tagId of this.places[index].tags) {
            tagsString = tagsString + " #" + this.tags.get(tagId) + ","
        }

        return tagsString.slice(0, -1)
    }


}