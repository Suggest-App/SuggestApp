import type { Media } from "@/models/Media";

export interface ProfileMedia extends Media {
    listenedSeconds: number,
}
