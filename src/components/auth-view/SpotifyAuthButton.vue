<script setup lang="ts">
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import { SpotifyColorEnum } from "@/models/enums/SpotifyColorEnum.ts";
import {useI18n} from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <button type="submit" class="spotify-oauth2-btn">
    <SpotifyIcon :color="SpotifyColorEnum.WHITE" />
    <span>{{ $t('authView.spotifyBtn') }}</span>
  </button>
</template>
