import type { AxiosResponse } from 'axios';
import type { ProfileInformation } from "@/models/ProfileInformation";
import type { Media } from "@/models/Media";
import { tryGetAuthorizedInstance } from "@/services/TokenService";
import type {DiscoverMedia} from "@/models/DiscoverMedia";
import type {ProfileMedia} from "@/models/ProfileMedia";
import type {HiddenMedia} from "@/models/HiddenMedia";

export default {

    /**
     * Fetch the users profile information
     *
     * @return Promise<ProfileInformation>
     */
    async fetchProfileInformation(): Promise<ProfileInformation> {
        return tryGetAuthorizedInstance().get('/user/profile-information')
            .then((response: AxiosResponse) => response.data)
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'ProfileService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Fetch the users personal summary
     *
     * @return Promise<Media[]>
     */
    async fetchPersonalSummary(): Promise<ProfileMedia[]> {
        return tryGetAuthorizedInstance().get('/user/spotify/personal-summary')
            .then((response: AxiosResponse) => response.data)
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'ProfileService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Fetch the users recommended media from all user matches
     *
     * @return Promise<DiscoverMedia[]>
     */
    async fetchDiscoverMediaSummary(): Promise<DiscoverMedia[]> {
        return tryGetAuthorizedInstance().get('/user/matches/recommended-media?limit=100')
            .then((response: AxiosResponse) => response.data)
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'ProfileService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Fetch the hidden media from all user
     *
     * @return Promise<Media[]>
     */
    async fetchHiddenMedia(): Promise<HiddenMedia[]> {
        return tryGetAuthorizedInstance().get('/user/spotify/personal-summary/hidden')
            .then((response: AxiosResponse) => response.data)
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'ProfileService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Patch the user settings (locale)
     *
     * @param locale 'en' | 'de'
     *
     * @return Promise<void>
     */
    async patchUserSettings(locale: 'en' | 'de'): Promise<void> {
        return tryGetAuthorizedInstance().patch('/user/settings', { 'language': locale })
            .then((response: AxiosResponse) => response.data)
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'ProfileService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },
}
