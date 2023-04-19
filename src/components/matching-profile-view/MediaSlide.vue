<script lang="ts" setup>
import type { PropType } from "vue";
import type {MediaSummary} from "@/models/MediaSummary";
import {computed, ComputedRef} from "vue";
import {useI18n} from "vue-i18n";
import {secondsToTime} from "@/composables/TimeCalculations";

// Initialize localization plugin
const { t } = useI18n()

const props = defineProps({
  slide: {
    type: Object as PropType<MediaSummary>,
    default: {} as MediaSummary
  }
})

/** --------------------- Template Properties --------------------- */

// Access media image url
const albumImage: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.albumImages)
      ? props.slide.albumImages[1].imageUrl
      : t('media.placeholders.noImage')
})

// Access song title
const songTitle: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.songTitle)
      ? props.slide.songTitle
      : t('media.placeholders.noTitle')
})

// Access username
const artists: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.allArtists)
      ? props.slide.allArtists.join().replace(',', ', ')
      : t('media.placeholders.noArtists')
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
</script>

<template>
  <div class="media-slide">
    <div class="album-wrapper">
      <img class="media-image" :src="albumImage" :alt="songTitle" />
      <div class="vinyl-plate" :style="{ backgroundImage: 'url('+albumImage+')' }"></div>
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
