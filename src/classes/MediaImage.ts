export class MediaImage {

    /** @var media image id */
    protected mediaId: string = ''

    /** @var url where the media image is located */
    protected imageUrl: string = ''

    /** @var width of the media */
    protected width: number = 0

    /** @var height of the media */
    protected height: number = 0

    /**
     * Get the media id
     *
     * @return string
     */
    public getMediaId(): string {
        return this.mediaId;
    }

    /**
     * Set the media id
     *
     * @param id string
     *
     * @return void
     */
    public setMediaId(id: string): void {
        this.mediaId = id;
    }

    /**
     * Get the media image url
     *
     * @return string
     */
    public getImageUrl(): string {
        return this.imageUrl;
    }

    /**
     * Set the media image url
     *
     * @param url string
     *
     * @return void
     */
    public setImageUrl(url: string): void {
        this.imageUrl = url;
    }

    /**
     * Get the with of the media image
     *
     * @return number
     */
    public getImageWidth(): number {
        return this.width;
    }

    /**
     * Set the with of the media image
     *
     * @param width number
     *
     * @return void
     */
    public setImageWidth(width: number): void {
        this.width = width;
    }

    /**
     * Get the height of the media image
     *
     * @return number
     */
    public getImageHeight(): number {
        return this.height;
    }

    /**
     * Set the height of the media image
     *
     * @param height number
     *
     * @return void
     */
    public setImageHeight(height: number): void {
        this.height = height;
    }
}
