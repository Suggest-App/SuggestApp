<script lang="ts" setup>
import type {PropType} from "vue";
import type {MediaSummary} from "@/models/MediaSummary";
import {computed, ComputedRef} from "vue";
import {secondsToMinutes} from "@/composables/TimeCalculations";
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

// Access index prop and increment it, in order to use it as rank
const rank: ComputedRef<string> = computed(() => {
  const stringRank: string = (props.index + 1).toString()
  switch (stringRank.length) {
    default:
    case 1:
      return '00' + stringRank
    case 2:
      return '0' + stringRank
    case 3:
      return stringRank
  }
})

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
      ? secondsToMinutes(props.media.listenedSeconds)
      : t('media.placeholders.noMinutes')
})
</script>

<template>
  <div class="list-media">
    <span class="rank">{{ rank }}</span>
    <img class="media-image" :src="albumImage" :alt="songTitle" />
    <div class="media-information">
      <span class="title">{{ songTitle }}</span>
      <span class="artist">
        <span v-if="isExplicit" class="explicit"></span>
        <span>{{ artists }}</span>
      </span>
    </div>
    <div class="tracked-time">6 Std. 27 Min.</div>
  </div>
</template>
