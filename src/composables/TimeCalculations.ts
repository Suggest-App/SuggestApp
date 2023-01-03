export function secondsToMinutes(seconds:number) : string {
    let minutes: number = seconds / 60
    let roundedMinutes: number = Math.floor(minutes)
    return roundedMinutes.toLocaleString("de-DE");
}
