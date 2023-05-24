import { tryGetAuthorizedInstance } from "@/services/TokenService";

export default {
    hideClickedMedia(mediaId: string, origin: string = 'personalHistory'): void {
        tryGetAuthorizedInstance().post('/user/hide-media', {
            mediumId: mediaId,
            origin: origin
        })
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

    restoreClickedMedia(mediaId: string, origin: string): void {
        tryGetAuthorizedInstance().delete('/user/hide-media', {
            data: {
                mediumId: mediaId,
                origin: origin
            }
        })
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