import type { Media } from "@/models/Media";

export interface PlaybackRecord {
    userUuid: string
    media: Media
    timePlayedSec : number
    playedTimestamp: number
}
