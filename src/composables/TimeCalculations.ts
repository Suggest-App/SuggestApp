
/**
 * Calculate seconds to minutes and round te result down to the next full minute
 *
 * @param seconds number
 *
 * @return string
 */
export function secondsToMinutes(seconds: number): string {
    if ((seconds / 100) > 100) {
        return (seconds / 100).toString()
    } else {
        return new Date(seconds * 1000).toISOString().substring(14, 19)
    }
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

/**
 * Format the last fetched datetime
 *
 * @param dateString string
 *
 * @return string
 */
export function lastFetchedDate(dateString: string): string {
    return new Date(dateString).toLocaleTimeString(
        [],
        {
            day: '2-digit',
            month:'2-digit',
            year: 'numeric'
        }
    ).split(',')[0]
}
