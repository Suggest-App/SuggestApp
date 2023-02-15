<script setup lang="ts">
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
import BaseSelect from "@/components/inputs/BaseSelect.vue";
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { allLocales, createLocaleObject, setLocale } from '@/i18n'
import { useI18n } from 'vue-i18n'
import { useMainStore } from "@/stores/MainStore";
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";

const { t } = useI18n()
const mainStore = useMainStore()
</script>

<template>
  <section id="connected-apps-view">
    <header>
      <RouterLink v-if="!mainStore.isDesktop" :to="{ name: 'ProfileView' }">
        <ArrowLeftIcon />
      </RouterLink>

      <h3>{{ $t('connectedAppsView.heading') }}</h3>
    </header>

    <div class="connected-app-wrapper">
      <SpotifyIcon color="#3bd23b" />
      <p>Spotify</p>
      <div class="connection-info">
        <div class="connect-status">
          <CheckIcon color="#3bd23b" />
          <span>{{ $t('connectedAppsView.connectStatus') }}</span>
        </div>
        <div class="disconnect-link">
          {{ $t('connectedAppsView.disconnectLink') }}
        </div>
      </div>
    </div>

  </section>
</template>

<style lang="scss">
@import "@/assets/scss/connected-apps-view/connected-apps-view.scss";
</style>
