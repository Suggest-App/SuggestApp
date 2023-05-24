import type { Media } from "@/models/Media";

export interface TogetherMedia extends Media {
    listenedSecondsYou: number,
    listenedSecondsMatch: number,
}
