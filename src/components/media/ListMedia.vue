<script lang="ts" setup>
import type {PropType} from "vue";
import type {MediaSummary} from "@/models/MediaSummary";
import {computed, ComputedRef} from "vue";
import {secondsToTime} from "@/composables/TimeCalculations";
import {useI18n} from "vue-i18n";

// Initialize localization plugin
const { t } = useI18n()

const props =  defineProps({
  media: {
    type: Object as PropType<MediaSummary>,
    default: {} as MediaSummary
  },
  index: {
    type: Number,
    default: 0
  }
})

/************************** Template Variables **************************/

// Access song title prop
const songTitle: ComputedRef<string> = computed(() => {
  return (props.media && props.media.songTitle)
      ? props.media.songTitle
      : t('media.placeholders.noTitle')
})

// Access username prop
const artists: ComputedRef<string> = computed(() => {
  return (props.media && props.media.allArtists)
      ? props.media.allArtists.join().replace(',', ', ')
      : t('media.placeholders.noArtists')
})

// Flag that indicates if title is explicit
const isExplicit: ComputedRef<boolean> = computed(() => {
  return props.media && props.media.explicitFlag
})

// Access media image url
const albumImage: ComputedRef<string> = computed(() => {
  return (props.media && props.media.albumImages)
      ? props.media.albumImages[1].imageUrl
      : t('media.placeholders.noImage')
})

// Time listened to a specific media
const trackedTime: ComputedRef<string> = computed(() => {
  return (props.media.listenedSeconds)
      ? secondsToTime(props.media.listenedSeconds)
      : t('media.placeholders.noMinutes')
})
</script>

<template>
  <div class="list-media">
    <span class="rank">{{ index + 1 }}</span>
    <img class="media-image" :src="albumImage" :alt="songTitle" />
    <div class="media-information">
      <span class="title">{{ songTitle }}</span>
      <span class="artist">
        <span v-if="isExplicit" class="explicit"></span>
        <span>{{ artists }}</span>
      </span>
    </div>
    <div class="tracked-time">{{ trackedTime }}</div>
  </div>
</template>
