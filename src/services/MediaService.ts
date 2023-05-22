import { tryGetAuthorizedInstance } from "@/services/TokenService";

export default {
    hideClickedMedia(mediaId: string, origin: string = 'personalHistory'): void {
        tryGetAuthorizedInstance().delete('/user/hidden-media', {
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

    restoreClickedMedia(mediaId: string, origin: string = 'personalHistory'): void {
        tryGetAuthorizedInstance().delete('/user/hidden-media', {
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