<script lang="ts" setup>
import {ref, PropType} from "vue";
import type {Ref} from "vue";
import type {MediaSummary} from "@/models/MediaSummary";
import MediaSlide from "@/components/media/MediaSlide.vue";
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import {useI18n} from "vue-i18n";

// Initialize localization plugin
const { t } = useI18n()

// Props from parent component
const props = defineProps({
  slides: {
    type: Object as PropType<MediaSummary[]>,
    default: {} as MediaSummary[]
  }
})

// The currently active slide
const activeSlideIndex: Ref<number> = ref(0)

// Calculate the active slide on scroll event
function scrollEvent(event: any) {
  if (event.target) {
    let scrollPosition = event.target.scrollLeft
    activeSlideIndex.value = Math.ceil(scrollPosition / 145)
  }
}

// Check if slide is active
function isActiveSlide(index: number): string {
  return (activeSlideIndex.value === index) ? 'active': ''
}
</script>

<template>
  <div class="slider-wrapper">
    <div class="media-slider" @scroll="scrollEvent">
      <MediaSlide
          v-for="(slide, index) in slides"
          :key="index"
          :slide="slide"
          :class="{ active: isActiveSlide(index) }"
      />
      <div class="pseudo-slide"></div>
      <div class="pseudo-slide"></div>
      <div v-if="false" class="spotify-btn">
        <SpotifyIcon />
        <span>{{ $t('matchingProfileView.openInSpotify') }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/media/media-slider.scss";
</style>
