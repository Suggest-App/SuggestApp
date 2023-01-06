import type { Match } from "@/models/Match";
import { tryGetAuthorizedInstance } from "@/services/TokenService";
import type { AxiosResponse } from "axios";
import type { MediaSummary } from "@/models/MediaSummary";

export default {

    /**
     * Fetch all users, that matches with the own media summary
     * Array is already ordered
     *
     * @return Promise<Match[]>
     */
    async fetchMatches(): Promise<Match[]>{
        return tryGetAuthorizedInstance().get('user/matches')
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
     *
     * @return Promise<MediaSummary[]>
     */
    async fetchRecommendedMedia(userId: string): Promise<MediaSummary[]> {
        return tryGetAuthorizedInstance().get(`/user/matches/${userId}/recommended-media`)
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
