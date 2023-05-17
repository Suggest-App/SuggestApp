import type { Media } from "@/models/Media";
import type { RecommendedMedia } from "@/models/RecommendedMedia";
import { formatDateString, secondsToTime } from "@/composables/MediaInformationFormatting";

export class User {

    /** @var id of this user */
    protected userId: string = ''

    /** @var spotify account name of this user */
    protected username: string = ''

    /** @var src where the spotify user image is located */
    protected profileImgSrc: string = ''

    /** @var formatted time the users has listened in total (example: 632 hr. 48 min.) */
    protected totalListenedTime: string = ''

    /** @var date since when this user has connected its spotify account */
    protected trackingSince: string = ''

    /** @var date when this user records have been updated last */
    protected lastFetch: string = ''

    /** @var array of media items represent the personal spotify track history */
    protected mediaSummary: Media[] = []

    /** @var array of media recommendations from all user matches in one list */
    protected recommendedMediaSummary: RecommendedMedia[] = []

    /**
     * Get the id of this user
     *
     * @return string
     */
    public getUserId(): string {
        return this.userId;
    }

    /**
     * Set the id of this user
     *
     * @param uid string
     *
     * @return void
     */
    public setUserId(uid: string): void {
        this.userId = uid;
    }

    /**
     * Get the name of this user
     *
     * @return string
     */
    public getUsername(): string {
        return this.username;
    }

    /**
     * Set the name of this user
     *
     * @param name string
     *
     * @return void
     */
    public setUsername(name: string): void {
        this.username = name;
    }

    /**
     * Get the src of this users profile image
     *
     * @return string
     */
    public getProfileImgSrc(): string {
        return this.profileImgSrc;
    }

    /**
     * Set the src of this users profile image
     *
     * @param src string
     *
     * @return void
     */
    public setProfileImgSrc(src: string): void {
        this.profileImgSrc = (src) ? src : '';
    }

    /**
     * Get the formatted time a users have listened in total
     *
     * @return string
     */
    public getTotalListenedTime(): string {
        return this.totalListenedTime;
    }

    /**
     * Set the formatted time a users have listened in total
     *
     * @param seconds number
     *
     * @return void
     */
    public setTotalListenedTime(seconds: number): void {
        this.totalListenedTime = secondsToTime(seconds);
    }

    /**
     * Get the date this user has connected its spotify account
     *
     * @return string
     */
    public getTrackingSince(): string {
        return this.trackingSince;
    }

    /**
     * Set the date this user has connected its spotify account
     *
     * @param date string
     *
     * @return void
     */
    public setTrackingSince(date: string): void {
        this.trackingSince = formatDateString(date);
    }

    /**
     * Get the date where the records of this user have been fetched last
     *
     * @return string
     */
    public getLastFetched(): string {
        return this.lastFetch;
    }

    /**
     * Set the date where the records of this user have been fetched last
     *
     * @param date string
     *
     * @return void
     */
    public setLastFetched(date: string): void {
        this.lastFetch = formatDateString(date)
    }

    /**
     * Get an array of media items that represent the personal spotify track history
     *
     * @return Media[]
     */
    public getMediaSummary(): Media[] {
        return this.mediaSummary;
    }

    /**
     * Set an array of media items that represent the personal spotify track history
     *
     * @param mediaArray Media[]
     *
     * @return void
     */
    public setMediaSummary(mediaArray: Media[]): void {
        this.mediaSummary = mediaArray;
    }

    /**
     * Get an array of recommended media items from all user matches
     *
     * @return RecommendedMedia
     */
    public getRecommendedMediaSummary(): RecommendedMedia[] {
        return this.recommendedMediaSummary;
    }

    /**
     * Set an array of recommended media items from all user matches
     *
     * @param mediaArray RecommendedMedia[]
     *
     * @return void
     */
    public setRecommendedMediaSummary(mediaArray: RecommendedMedia[]): void {
        this.recommendedMediaSummary = mediaArray;
    }
}
