/**
 * Created by jose on 15/11/16.
 */

export interface Place {
    id: string,
    latitude: number,
    longitude: number,
    name: string,
    lactose: boolean,
    review: string,
    url: string,
    tags: string[],
    tagsNames?: string[],
    googleMapsUrl?: string
}