import type { AxiosResponse } from 'axios';
import type { ProfileInformation } from "@/models/ProfileInformation";
import type { Media } from "@/models/Media";
import { tryGetAuthorizedInstance } from "@/services/TokenService";

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
    async fetchPersonalSummary(): Promise<Media[]> {
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
    }
}
