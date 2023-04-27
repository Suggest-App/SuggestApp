import type { MediaImage } from "@/models/MediaImage";

export interface TogetherMedia {
    songTitle:       string,
    allArtists:      string[],
    explicitFlag:     boolean,
    listenedSecondsMatch: number,
    listenedSecondsYou: number,
    albumImages:     MediaImage[],
    linkToMedia:     string,
    albumName:       string,
    releaseDate:     string
}
