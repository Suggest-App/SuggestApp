import type { AxiosInstance } from 'axios'
import axios from "axios";
import router from "@/router";

/**
 * Get cookie by name
 *
 * @param name
 */
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) { // @ts-ignore
        return parts.pop().split(';').shift();
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

    // If no token redirect to auth view
    if (!jwtCookie) {
        router.push('/')
    }

    // Set token in axios header
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + jwtCookie

    // return authorized instance
    return instance
}
