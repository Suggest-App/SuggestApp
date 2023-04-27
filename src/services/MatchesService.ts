import type { Match } from "@/models/Match";
import { tryGetAuthorizedInstance } from "@/services/TokenService";
import type { AxiosResponse } from "axios";
import type { Media } from "@/models/Media";
import type { ProfileInformation } from "@/models/ProfileInformation";

export default {

    /**
     * Fetch all users, that matches with the own media summary
     * Array is already ordered
     *
     * @return Promise<Match[]>
     */
    async fetchMatches(limit: number = 0): Promise<Match[]>{
        const limitParam = (limit > 0) ? '?limit='+limit : ''
        return tryGetAuthorizedInstance().get(`user/matches${limitParam}`)
            .then((response: AxiosResponse) => {
                return response.data
            })
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'MatchesService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Fetch the profile information from a match
     *
     * @param userId string
     *
     * @return Promise<ProfileInformation>
     */
    async fetchMatchInformation(userId: string): Promise<ProfileInformation> {
        return tryGetAuthorizedInstance().get(`/user/profile-information/${userId}`)
            .then((response: AxiosResponse) => {
                return response.data
            })
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'MatchesService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Fetch all media recommendations from a user match after the match has been clicked
     * Array is already ordered
     *
     * @param userId string
     * @param limit number (default of 0 won't limit the query)
     *
     * @return Promise<Media[]>
     */
    async fetchRecommendedMedia(userId: string, limit: number = 0): Promise<Media[]> {
        const limitParam = (limit > 0) ? '?limit='+limit : ''
        return tryGetAuthorizedInstance().get(`/user/matches/${userId}/recommended-media${limitParam}`)
            .then((response: AxiosResponse) => {
                return response.data
            })
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'MatchesService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Fetch all together listened tracks from a user match after the tab has been clicked
     * Array is already ordered
     *
     * @param userId string
     * @param limit number (default of 0 won't limit the query)
     *
     * @return Promise<Media[]>
     */
    async fetchTogetherConsumedMedia(userId: string, limit: number = 0): Promise<Media[]> {
        const limitParam = (limit > 0) ? '?limit='+limit : ''
        return tryGetAuthorizedInstance().get(`/user/matches/${userId}/together-consumed/tracks${limitParam}`)
            .then((response: AxiosResponse) => {
                return response.data
            })
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'MatchesService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    },

    /**
     * Fetch a matches personal summary
     *
     * @param userId string
     * @param limit number (default of 0 won't limit the query)
     *
     * @return Promise<Media[]>
     */
    async fetchMatchSummary(userId: string, limit: number = 0): Promise<Media[]> {
        const limitParam = (limit > 0) ? '?limit='+limit : ''
        return tryGetAuthorizedInstance().get(`/user/spotify/personal-summary/${userId}${limitParam}`)
            .then((response: AxiosResponse) => {
                return response.data
            })
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'MatchesService.ts no status case ' + error.response.status
                        )
                        break
                }
            })
    }
}
