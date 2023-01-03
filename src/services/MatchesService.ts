import type {Match} from "@/models/Match";
import {tryGetAuthorizedInstance} from "@/services/TokenService";
import type {AxiosResponse} from "axios";
import type {MediaSummary} from "@/models/MediaSummary";

export default {

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

    async fetchRecommendedMedia(): Promise<MediaSummary> {
        return tryGetAuthorizedInstance().get('user/match/{userId}/recommended-media')
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
