<script lang="ts" setup>
import {ref, PropType} from "vue";
import type {Ref} from "vue";
import type {MediaSummary} from "@/models/MediaSummary";
import MediaSlide from "@/components/matching-profile-view/MediaSlide.vue";
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";

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
    activeSlideIndex.value = Math.ceil(scrollPosition / 115)
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
      <div class="spotify-btn">
        <SpotifyIcon color="#FFFFFF" />
        <span>In Spotify öffnen</span>
      </div>
    </div>
  </div>
</template>

<style>
h1 {
  color: #FFFFFF;
}
</style>
