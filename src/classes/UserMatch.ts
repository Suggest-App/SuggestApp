import { User } from "@/classes/User";
import type { Media } from "@/models/Media";
import { secondsToTime } from "@/composables/MediaInformationFormatting";

export class UserMatch extends User {

    /** @var rank of a user match */
    protected rank: number = 0

    /** @var the formatted time both users have listened together (example: 1 hr. 23 min.) */
    protected togetherListenedTime: string = ''

    /** @var array of media items both users have listened to */
    protected togetherConsumedMedia: Media[] = []

    /** @var array of media items that are recommended from the user match */
    protected recommendedMedia: Media[] = []

    /**
     * Get the rank of a user match
     *
     * @return number
     */
    public getRank(): number {
        return this.rank;
    }

    /**
     * Set the rank of a user match
     *
     * @param rank number
     *
     * @return void
     */
    public setRank(rank: number): void {
        this.rank = rank;
    }

    /**
     * Get the formatted time both users have listened together
     *
     * @return string
     */
    public getTogetherListenedTime(): string {
        return this.togetherListenedTime;
    }

    /**
     * Set the formatted time both users have listened together
     *
     * @param seconds number
     *
     * @return void
     */
    public setTogetherListenedTime(seconds: number): void {
        this.togetherListenedTime = secondsToTime(seconds);
    }

    /**
     * Get the array of media items both users have listened to
     *
     * @return number
     */
    public getTogetherConsumedMedia(): Media[] {
        return this.togetherConsumedMedia;
    }

    /**
     * Set an array of media items both users have listened to
     *
     * @param mediaArray Media[]
     *
     * @return void
     */
    public setTogetherConsumedMedia(mediaArray: Media[]): void {
        this.togetherConsumedMedia = mediaArray;
    }

    /**
     * Get an array of media items that are recommended from the user match
     *
     * @return number
     */
    public getRecommendedMedia(): Media[] {
        return this.recommendedMedia;
    }

    /**
     * Set an array of media items that are recommended from the user match
     *
     * @param mediaArray Media[]
     *
     * @return void
     */
    public setRecommendedMedia(mediaArray: Media[]): void {
        this.recommendedMedia = mediaArray;
    }
}
