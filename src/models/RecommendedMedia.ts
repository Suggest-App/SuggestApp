import type { MediaImage } from "@/models/MediaImage";

export interface RecommendedMedia {
    orderValue:           number
    username:             string
    profileUrl:           string
    albumImages:          MediaImage[]
    linkToMedia:          string
    albumName:            string
    explicitFlag:         boolean
    songTitle:            string
    allArtists:           string[]
    listenedSecondsMatch: number
    origin:               string
}
