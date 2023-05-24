import type { Media } from "@/models/Media";

export interface TogetherMedia extends Media {
    listenedSeconds: number,
    listenedSecondsMatch: number,
}
