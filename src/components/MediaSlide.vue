<script lang="ts" setup>
import { computed } from "vue";
import type { PropType,ComputedRef } from "vue";
import type { Media } from "@/models/Media";
import { useI18n } from "vue-i18n";
import { secondsToTime } from "@/composables/MediaInformationFormatting";
import { useMainStore } from "@/stores/MainStore";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()

const props = defineProps({
  slide: {
    type: Object as PropType<Media>,
    default: {} as Media
  }
})

/** --------------------- Template Properties --------------------- */

// Access media image url
const mediaImageSrc: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.albumImages)
      ? props.slide.albumImages[1].imageUrl
      : ''
})

// Access song title
const songTitle: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.songTitle)
      ? props.slide.songTitle
      : 'song title unknown'
})

// Access song title
const linkToMedia: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.linkToMedia)
      ? props.slide.linkToMedia
      : 'media link unknown'
})

// Access username
const artists: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.allArtists)
      ? props.slide.allArtists.join().replace(',', ', ')
      : 'artist unknown'
})

// Access the listened seconds of your own account
const ownListenedSeconds: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.listenedSeconds)
      ? secondsToTime(props.slide.listenedSeconds)
      : '-'
})

// Access the listened seconds of your match
const matchesListenedSeconds: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.listenedSeconds)
      ? secondsToTime(props.slide.listenedSeconds)
      : '-'
})

function openInSpotify(): void {
  if (props.slide && props.slide.linkToMedia) {
    window.open(props.slide.linkToMedia)
  }
}
</script>

<template>
  <div class="media-slide">
    <div class="album-wrapper" @click="window.open(linkToMedia)">
      <img
          v-show="!mainStore.isLoading"
          class="media-image"
          v-lazy="mediaImageSrc"
          :alt="songTitle"
          @click="openInSpotify"
      />
      <div
          v-show="mainStore.isLoading"
          class="media-image"
          @click="openInSpotify"
      ></div>
      <img
          v-show="!mainStore.isLoading"
          class="vinyl-plate"
          v-lazy="mediaImageSrc"
          :alt="songTitle"
          @click="window.open(slide.linkToMedia)"
      />
    </div>
    <div class="media-information">
      <span class="title">{{ songTitle }}</span>
      <span class="artist">{{ artists }}</span>
    </div>
    <div class="tracking-information">
      <span class="user-wrapper">
        <span class="name">{{ $t('matchingProfileView.trackingInformation.you') }}</span>
        <span>{{ ownListenedSeconds }}</span>
      </span>
      <span class="user-wrapper">
        <span class="name">{{ $t('matchingProfileView.trackingInformation.match') }}</span>
        <span>{{ matchesListenedSeconds }}</span>
      </span>
    </div>
  </div>
</template>
