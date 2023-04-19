
/**
 * Calculate seconds to minutes and round te result down to the next full minute
 *
 * @param seconds number
 *
 * @return string
 */
export function secondsToMinutes(seconds: number): string {
    let hours: number = seconds / 3600

    // Display only seconds
    if (hours * 60 < 1) {
        return seconds + 'Sek.'
    }

    // Display minutes and seconds
    if (hours < 1) {
        return Math.floor(hours * 60) + ' Min. ' + Math.floor(((hours * 60) % 1) * 60) + ' Sek.'
    }

    // Display hours and minutes
    if (hours >= 1) {
        return Math.floor(hours) + ' Std. ' + Math.floor((hours % 1) * 60) + ' Min.'
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
