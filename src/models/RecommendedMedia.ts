import type { MediaImage } from "@/models/MediaImage";

export interface RecommendedMedia {
    orderValue: number
    userName: string
    profileUrl: string
    albumImages:     MediaImage[]
    linkToMedia:     string
    albumName:       string
    explicitFlag:     boolean
    songTitle:       string
    allArtists:      string[]
    listenedSecondsMatch: number
}
