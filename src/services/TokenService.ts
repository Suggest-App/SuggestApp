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

    //const jwtCookie = getCookie('jwt')
    const jwtCookie = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNWVhNTMwMy01ZWY5LTQ2OWQtMWIzZC0wOGRiMTc4NDEzODkiLCJuYW1lIjoicy5jbGFlcyIsImV4cCI6MTY4MDEyMzU5OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWF0IjoxNjc5ODY0Mzk4LCJuYmYiOjE2Nzk4NjQzOTh9.Y-ZiUHB-OpYBGNIE6hJF9FSXi6NluXT-0ce05WQ9OlVLa3WsDUMIc6YTL9WE8OtoHmHsrzmlMqYS73WFKBojIw'

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
