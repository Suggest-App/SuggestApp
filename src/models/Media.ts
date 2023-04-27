import type { MediaImage } from "@/models/MediaImage";

export interface Media {
    songTitle:       string,
    allArtists:      string[],
    explicitFlag:     boolean,
    listenedSeconds: number,
    albumImages:     MediaImage[],
    linkToMedia:     string,
    albumName:       string,
    releaseDate:     string
}
