
/**
 * Calculate seconds to minutes and round te result down to the next full minute
 *
 * @param seconds number
 *
 * @return string
 */
export function secondsToMinutes(seconds: number): string {
    let minutes: number = seconds / 60
    let roundedMinutes: number = Math.floor(minutes)
    return roundedMinutes.toLocaleString('de-DE');
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
