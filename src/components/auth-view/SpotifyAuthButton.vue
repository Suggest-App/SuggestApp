<script setup lang="ts">
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import { SpotifyColorEnum } from "@/models/enums/SpotifyColorEnum.ts";
</script>

<template>
  <button type="submit" class="spotify-oauth2-btn">
    <SpotifyIcon :color="SpotifyColorEnum.WHITE" />
    <span>Connect with Spotify</span>
  </button>
</template>
