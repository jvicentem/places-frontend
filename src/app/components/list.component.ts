/**
 * Created by jose on 25/09/16.
 */
import { Component, Inject } from '@angular/core';
import { PlacesService } from '../services/PlacesService';
import { TagsService } from '../services/TagsService';

@Component(
    {
        selector: 'places-list',
        templateUrl: './templates/list.component.html',
        providers: [PlacesService, TagsService],
        styles: ['a { color: black; }']
    }
)
export class PlacesListComponent {
    private places: any[];
    private tags = new Map();

    private showList: boolean;

    private color: string;

    constructor(@Inject(PlacesService) private placesService:PlacesService,
                @Inject(TagsService) private tagsService:TagsService) { }

    ngOnInit() {
        this.fetchPlaces();
        this.tags = this.getTags();
        this.showList = false;
        this.color = this.randomColor();
    }

    private randomColor(): string {
        let colors = ['#00868B', '#8968CD', '#DC143C', '#008B00', '	#CD6600', '#515151', '#000000'];
        return colors[Math.floor(Math.random() * 6)];
    }

    showPlaces(): void {
        this.showList = (this.showList)? false : true;
        this.color = this.randomColor();
    }

    fetchPlaces(): void {
        this.placesService.getPlaces().subscribe(
            (data) => {
                let places = data.json().places;

                this.places = places.filter(o => o.review != 'bad');

                navigator.geolocation.getCurrentPosition((position) => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;

                    this.places.sort((e1, e2) => {
                        let diff1 = Math.abs(e1.coordinates.latitude - lat) + Math.abs(e1.coordinates.longitude - lng);
                        let diff2 = Math.abs(e2.coordinates.latitude - lat) + Math.abs(e2.coordinates.longitude - lng);

                        if (diff1 > diff2) {
                            return 1;
                        }

                        if (diff1 < diff2) {
                            return -1;
                        }

                        return 0;
                    })
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }

    getTags(): Map<{}, {}> {
        let tags = new Map();

        this.tagsService.getTags().subscribe(
            (data) => {
                let tagsJsonList = data.json().tags;

                for (let tag of tagsJsonList) {
                    tags.set(tag._id, tag.name);
                }
            },
            (error) => {
                console.log(error);
            }
        )

        return tags;
    }

    getTagsString(index: number): string {
        let tagsString: string = '';

        for (let tagId of this.places[index].tags) {
            tagsString = tagsString + " #" + this.tags.get(tagId) + ",";
        }

        return tagsString.slice(0, -1);
    }


}
