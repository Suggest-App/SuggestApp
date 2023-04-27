export interface ProfileInformation {
    username:     string
    profileImage: string
    totalListenedSeconds: number
    totalTogetherListenedSeconds: number | null
    trackingSince: string
    latestFetch: string
}
