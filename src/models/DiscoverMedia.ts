import type { Media } from "@/models/Media";

export interface DiscoverMedia extends Media {
    orderValue:           number
    username:             string
    profileUrl:           string
    listenedSeconds:      number
}
