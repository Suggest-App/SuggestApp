import type { AxiosInstance } from 'axios'
import axios from "axios";
import router from "@/router";

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

export function setCookie(name: string, value: string,days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/**
 * Try to delete a cookie by its name
 *
 * @param name string
 *
 * @return void
 */
export function deleteCookie(name: string): void {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
        // If no token exists or response status is 401, delete token and redirect to auth view
        if (!jwtCookie || error.response.status === 401) {
            deleteCookie('jwt')
            router.push({ name: 'AuthView'})
        }
    });

    // Set token in axios header
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + jwtCookie

    // return authorized instance
    return instance
}

/**
 * Disconnect a user
 *
 * @return Promise<void>
 */
export async function disconnectUser(): Promise<void> {
    return tryGetAuthorizedInstance().delete('/user/spotify-disconnect')
        .then(() => {
            deleteCookie('jwt')
            router.push('/')
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
}
