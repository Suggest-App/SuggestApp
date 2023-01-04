import type { AxiosResponse } from 'axios';
import type { ProfileInformation } from "@/models/ProfileInformation";
import type { MediaSummary } from "@/models/MediaSummary";
import { tryGetAuthorizedInstance } from "@/services/TokenService";

export default {

    /**
     * Fetch the users profile information
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
     */
    async fetchPersonalSummary(): Promise<MediaSummary[]> {
        return tryGetAuthorizedInstance().get('/user/spotify/personal-summary')
            .then((response: AxiosResponse) => response.data.reverse())
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'ProfileService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    }
}

