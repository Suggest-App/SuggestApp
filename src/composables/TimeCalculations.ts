import {i18n} from "@/i18n";

/**
 * Calculate seconds to minutes and round te result down to the next full minute
 *
 * @param seconds number
 *
 * @return string
 */
export function secondsToMinutes(seconds: number): string {
    let hours: number = seconds / 3600

    let activeLocale = i18n.global.locale.value
    let hr = (activeLocale === 'en') ? 'hr.'  : 'Std.'
    let m  = (activeLocale === 'en') ? 'min.' : 'Min.'
    let s  = (activeLocale === 'en') ? 'sec.' : 'Sek.'

    // Display only seconds
    if (hours * 60 < 1) {
        return seconds+' '+s
    }

    // Display minutes and seconds
    if (hours < 1) {
        return Math.floor(hours * 60)+' '+m+' '+Math.floor(((hours * 60) % 1) * 60)+' '+s
    }

    // Display hours and minutes
    if (hours >= 1) {
        return Math.floor(hours)+' '+hr+' '+Math.floor((hours % 1) * 60)+' '+m
    }

    return '-'
}

/**
 * Format UTC date string to german local date
 *
 * @param dateString string
 *
 * @return string
 */
export function trackingSinceDate(dateString: string): string {
    return new Date(dateString).toLocaleTimeString(
        [],
        {
            day: '2-digit',
            month:'2-digit',
            year: 'numeric'
        }
    ).split(',')[0]
}
