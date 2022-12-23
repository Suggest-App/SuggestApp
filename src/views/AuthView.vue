<script setup>
import axios from "axios";
import SpotifyAuthButton from "@/components/auth-view/SpotifyAuthButton.vue";

function spotifyAuthorization() {
  axios
    .post("/signin", "Spotify", {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch(error => {
      console.log(error)
    })
}
</script>

<template>
  <section id="auth-view">
    <div class="container">
      <h1>CONNECT WITH SPOTIFY</h1>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p>
      <SpotifyAuthButton @click.prevent="spotifyAuthorization" />
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/auth-view.scss";
</style>
