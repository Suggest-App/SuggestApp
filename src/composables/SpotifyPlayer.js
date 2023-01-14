import { getSpotifyToken } from "@/services/TokenService";

export function createScriptTag() {
    // Create the spotify-player.js script tag and append it
    let spotifyWebSDKScript = document.createElement('script')
    spotifyWebSDKScript.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js')
    document.head.appendChild(spotifyWebSDKScript)
}

export async function createSpotifyWebPlayer() {
    await window.onSpotifyWebPlaybackSDKReady = async () => {

        // Get the users authorization token
        const token = await getSpotifyToken()

        // Create the player instance
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => {
                cb(token);
            },
            volume: 0.5
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        /*
        document.getElementById('togglePlay').onclick = function() {
            player.togglePlay();
        };
        */

        player.connect();
    }
}
