import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from "axios";
import router from "@/router";
import type { SpotifyToken } from "@/models/SpotifyToken";

/**
 * Try to get a cookie by its name
 *
 * @param name string
 *
 * @return string | undefined
 */
export function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        let lastElement = parts.pop()
        return (lastElement)
            ? lastElement.split(';').shift()
            : undefined
    }
}

/**
 * Get an authorized axios instance in order to get, post or patch data
 *
 * @return AxiosInstance
 */
export function tryGetAuthorizedInstance(): AxiosInstance {

    const jwtCookie = getCookie('jwt')
    const instance = axios.create()

    instance.interceptors.response.use((response) => response, (error) => {
        // If no token exists or response status is 401, redirect to auth view
        if (!jwtCookie || error.response.status === 401) {
            router.push('/')
        }
    });

    // Set token in axios header
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + jwtCookie

    // return authorized instance
    return instance
}


/**
 * Get the useres spotify token for the embedded player
 *
 * @return Promise<SpotifyToken>
 */
export async function getSpotifyToken(): Promise<SpotifyToken> {
    return tryGetAuthorizedInstance().get('/user/spotify-token')
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
            switch (error.response.status) {
                default:
                    console.log(
                        'TokenService.ts no status case ' + error.response.status
                    )
                    break
            }
        })
}
