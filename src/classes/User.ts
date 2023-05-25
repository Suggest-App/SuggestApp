import type { Media } from "@/models/Media";
import type { DiscoverMedia } from "@/models/DiscoverMedia";
import { formatDateString, secondsToTime } from "@/composables/MediaInformationFormatting";
import type {ProfileMedia} from "@/models/ProfileMedia";
import type {HiddenMedia} from "@/models/HiddenMedia";

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
    protected mediaSummary: ProfileMedia[] = []

    /** @var array of all media items that are hidden */
    protected hiddenMedia: HiddenMedia[] = []

    /** @var array of media recommendations from all user matches in one list */
    protected discoverMediaSummary: DiscoverMedia[] = []

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
     * @return ProfileMedia[]
     */
    public getMediaSummary(): ProfileMedia[] {
        return this.mediaSummary;
    }

    /**
     * Set an array of media items that represent the personal spotify track history
     *
     * @param mediaArray ProfileMedia[]
     *
     * @return void
     */
    public setMediaSummary(mediaArray: ProfileMedia[]): void {
        this.mediaSummary = mediaArray;
    }

    /**
     * Get an array of discover media items from all user matches
     *
     * @return DiscoverMedia
     */
    public getDiscoverMediaSummary(): DiscoverMedia[] {
        return this.discoverMediaSummary;
    }

    /**
     * Set an array of discover media items from all user matches
     *
     * @param mediaArray DiscoverMedia[]
     *
     * @return void
     */
    public setDiscoverMediaSummary(mediaArray: DiscoverMedia[]): void {
        this.discoverMediaSummary = mediaArray;
    }

    /**
     * Get the array of hidden media items
     *
     * @return Media[]
     */
    public getHiddenMedia(): HiddenMedia[] {
        return this.hiddenMedia;
    }

    /**
     * Set the array of hidden media items
     *
     * @param mediaArray Media[]
     *
     * @return void
     */
    public setHiddenMedia(mediaArray: HiddenMedia[]): void {
        this.hiddenMedia = mediaArray;
    }
}
