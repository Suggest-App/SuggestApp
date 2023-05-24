import type { MediaImage } from "@/models/MediaImage";

export interface Media {
    mediumId:             string,
    songTitle:            string,
    allArtists:           string[],
    explicitFlag:         boolean,
    listenedSeconds:      number,
    listenedSecondsMatch: number,
    listenedSecondsYou:   number | null,
    albumImages:          MediaImage[],
    linkToMedia:          string,
    albumName:            string,
    releaseDate:          string
    origin:               string
}
