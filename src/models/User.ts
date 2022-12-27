import type { PlaybackRecord } from "@/models/PlaybackRecord"

export interface User {
    uuid: string
    accountName: string
    email: string
    password: string
    playbackRecords : PlaybackRecord
}
