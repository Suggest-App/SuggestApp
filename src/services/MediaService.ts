import { tryGetAuthorizedInstance } from "@/services/TokenService";

export default {
    hideClickedMedia(mediaId: string): void {
        tryGetAuthorizedInstance().get(`/profile/hide-media/${mediaId}`)
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

    restoreClickedMedia(mediaId: string): void {
        tryGetAuthorizedInstance().get(`/profile/restore-media/${mediaId}`)
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