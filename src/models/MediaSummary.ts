import type { AlbumImages } from "@/models/AlbumImages";

export interface MediaSummary {
    songTitle:       string,
    allArtists:      string[],
    explicitFlag:     boolean,
    listenedSeconds: number,
    albumImages:     AlbumImages[],
    linkToMedia:     string
}
