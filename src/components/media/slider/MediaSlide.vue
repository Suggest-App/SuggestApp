<script lang="ts" setup>
import {computed, ref } from "vue";
import type { PropType,ComputedRef,Ref } from "vue";
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

const showListenedSecondsYou: Ref<boolean> = ref(true)

// Access the listened seconds of your own account
const listenedSecondsYou: ComputedRef<string> = computed(() => {
  if (props.slide && props.slide.listenedSecondsYou === null) {
    showListenedSecondsYou.value = false
    return '-'
  }
  return secondsToTime(props.slide.listenedSecondsYou as number)
})

// Access the listened seconds of your match
const listenedSecondsMatch: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.listenedSecondsMatch)
      ? secondsToTime(props.slide.listenedSecondsMatch)
      : '-'
})

// Access the listened seconds of your match
const listenedSeconds: ComputedRef<string> = computed(() => {
  return (props.slide && props.slide.listenedSeconds)
      ? secondsToTime(props.slide.listenedSeconds)
      : '-'
})

function openInSpotify(): void {
  if (props.slide && props.slide.linkToMedia) {
    window.open(props.slide.linkToMedia)
  }
}

const isHovered: Ref<boolean> = ref(false)
</script>

<template>
  <div class="media-slide"
       :class="{ active: isHovered}"
       @mouseenter="isHovered = true"
       @mouseleave="isHovered = false"
  >
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
      <div
          class="vinyl-plate"
          v-show="!mainStore.isLoading"
          @click="window.open(slide.linkToMedia)"
      >
        <img v-lazy="mediaImageSrc" :alt="songTitle"/>
      </div>
    </div>
    <div class="media-information">
      <span class="title">{{ songTitle }}</span>
      <span class="artist">{{ artists }}</span>
    </div>
    <div class="tracking-information">
      <span v-if="showListenedSecondsYou" class="user-wrapper">
        <span class="name">{{ $t('matchingProfileView.trackingInformation.you') }}</span>
        <span>{{ listenedSecondsYou }}</span>
      </span>


      <span v-if="showListenedSecondsYou" class="user-wrapper">
        <span class="name">{{ $t('matchingProfileView.trackingInformation.match') }}</span>
        <span>{{ listenedSecondsMatch }}</span>
      </span>

      <span v-if="!showListenedSecondsYou" class="user-wrapper">
        <span class="name">{{ $t('matchingProfileView.trackingInformation.match') }}</span>
        <span>{{ listenedSeconds }}</span>
      </span>
    </div>
  </div>
</template>
