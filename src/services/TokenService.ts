import type { AxiosInstance } from 'axios'
import axios from "axios";
import router from "@/router";
import type { DevUser } from "@/models/DevUser";
import {useRoute} from "vue-router";

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

export function setCookie(name: string, value: string, days: number = 30) {
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
 * Check if a user is valid
 *
 * @return Promise<void>
 */
export async function validateUser(): Promise<void> {
    return tryGetAuthorizedInstance().get('/user/valid')
        .then(resp => {
            if (!resp.data) {
                deleteCookie('jwt')
                router.push('/')
            }
        })
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

/**
 *
 *
 * @return Promise<void>
 */
export async function checkUrlToken(): Promise<void> {
    const route = useRoute()
    const token = (route.params && route.params) ? route.params.loginToken : ''
    axios.get(`/login-with-token/${token}`)
        .then(resp => {
            if (resp.data.jwt && resp.data.jwt !== '') {
                setCookie('jwt', resp.data.jwt)
                router.push({ name: 'profile'})
            }
        })
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

/**
 * Get all User Accounts
 *
 * @param pw string
 *
 * @return Promise<DevUser[]>
 */
export async function getUsersAccounts(pw: string): Promise<DevUser[]> {
    return axios.get(`/admin/list-users/${pw}`)
        .then(resp => {
            return resp.data
        })
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

/**
 * Get a user token by its id
 *
 * @param uid string
 * @param pw string
 *
 * @return Promise<string>
 */
export async function getUserToken(uid: string, pw: string): Promise<string> {
    return axios.get(`/admin/get-token/${uid}/${pw}`)
        .then(resp => resp.data.jwt)
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
