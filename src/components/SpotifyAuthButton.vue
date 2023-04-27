<script setup lang="ts">
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <button type="submit" class="spotify-oauth2-btn">
    <SpotifyIcon />
    <span>{{ $t('authView.spotifyBtn') }}</span>
  </button>
</template>
