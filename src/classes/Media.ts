import { formatDateString } from "@/composables/MediaInformationFormatting";
import type { MediaImage } from "@/classes/MediaImage";

export class Media {

    /** @var title of the media */
    protected mediaTitle: string = ''

    /** @var creator of the media */
    protected allArtists: string[] = ['']

    /** @var flag that indicates if the media contains verbal content */
    protected explicitFlag: boolean = false

    /** @var seconds the user has listened to the media */
    protected listenedSeconds: number = 0

    /** @var array of different image sizes of a media  */
    protected mediaImgSrcSet: MediaImage[] = []

    /** @var the link that opens the media in its app */
    protected linkToMedia: string = ''

    /** @var name of the related album */
    protected albumName: string = ''

    /** @var date when the media has been released */
    protected releaseDate: string = ''

    /**
     * Get the media title
     *
     * @return string
     */
    public getTitle(): string {
        return this.mediaTitle;
    }

    /**
     * Set the media title
     *
     * @param title string
     *
     * @return void
     */
    public setTitle(title: string): void {
        this.mediaTitle = title;
    }

    /**
     * Get an array of all artists
     *
     * @return string[]
     */
    public getAllArtists(): string[] {
        return this.allArtists;
    }

    /**
     * Set the array of all artists
     *
     * @param artists string[]
     *
     * @return void
     */
    public setAllArtists(artists: string[]): void {
        this.allArtists = artists;
    }

    /**
     * Get the explicit flag
     *
     * @return boolean
     */
    public getExplicitFlag(): boolean {
        return this.explicitFlag;
    }

    /**
     * Set the explicit flag
     *
     * @param flag boolean
     *
     * @return void
     */
    public setExplicitFlag(flag: boolean): void {
        this.explicitFlag = flag;
    }

    /**
     * Get the seconds a user has listened to a media
     *
     * @return number
     */
    public getListenedSeconds(): number {
        return this.listenedSeconds;
    }

    /**
     * Set the seconds a user has listened to a media
     *
     * @param seconds number
     *
     * @return void
     */
    public setListenedSeconds(seconds: number): void {
        this.listenedSeconds = seconds;
    }

    /**
     * Get the media image src set
     *
     * @return MediaImage[]
     */
    public getMediaImgSrcSet(): MediaImage[] {
        return this.mediaImgSrcSet;
    }

    /**
     * Set the media image src set
     *
     * @param imgSrcSet MediaImage[]
     *
     * @return void
     */
    public setMediaImgSrcSet(imgSrcSet: MediaImage[]): void {
        this.mediaImgSrcSet = imgSrcSet;
    }

    /**
     * Get the media link
     *
     * @return string
     */
    public getLinkToMedia(): string {
        return this.linkToMedia;
    }

    /**
     * Set the media link
     *
     * @param link string
     *
     * @return void
     */
    public setLinkToMedia(link: string): void {
        this.linkToMedia = link;
    }

    /**
     * Get the album name
     *
     * @return string
     */
    public getAlbumName(): string {
        return this.albumName;
    }

    /**
     * Set the album name
     *
     * @param name string
     *
     * @return void
     */
    public setAlbumName(name: string): void {
        this.albumName = name;
    }

    /**
     * Get the medias release date
     *
     * @return string
     */
    public getReleaseDate(): string {
        return this.releaseDate;
    }

    /**
     * Set the medias release date
     *
     * @param date string
     *
     * @return void
     */
    public setReleaseDate(date: string): void {
        this.releaseDate = formatDateString(date);
    }
}
