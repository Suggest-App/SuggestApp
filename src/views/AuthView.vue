<script setup lang="ts">
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import { SpotifyColorEnum } from "@/models/enums/SpotifyColorEnum.ts";
</script>

<template>
  <section id="auth-view">
    <div class="container">
      <h1>CONNECT WITH SPOTIFY</h1>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p>
      <button class="spotify-oauth2-btn">
        <SpotifyIcon :color="SpotifyColorEnum.WHITE" />
        <span>Connect with Spotify</span>
      </button>
    </div>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/auth-view.scss";
</style>
