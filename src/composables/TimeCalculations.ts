
/**
 * Calculate seconds to minutes and round te result down to the next full minute
 *
 * @param seconds number
 *
 * @return string
 */
export function secondsToMinutes(seconds: number): string {
    let minutes: number = seconds / 60
    let roundedMinutes: number = Math.round((minutes + Number.EPSILON) * 100) / 100
    let minutesAsString = roundedMinutes.toLocaleString('de-DE')

    // If there are over 100 Minutes heard, just return the full minutes
    if (roundedMinutes > 100) {
        return minutesAsString.split(',')[0]
    } else {

        let splittetMinutes = minutesAsString.split(',')[1]
        let formattedMinutes = minutesAsString.replace(',', ':')

        return (splittetMinutes && splittetMinutes.length === 1)
            ? formattedMinutes + '0'
            : formattedMinutes
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
