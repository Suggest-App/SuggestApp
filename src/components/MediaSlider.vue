<script lang="ts" setup>
import MediaSlide from "@/components/MediaSlide.vue";
import {onMounted, ref} from "vue";
import type { Ref, PropType} from "vue";
import type { Media } from "@/models/Media";
import { useI18n } from "vue-i18n";
import { useMainStore } from "@/stores/MainStore";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()

// Props from parent component
defineProps({
  slides: {
    type: Object as PropType<Media[]>,
    default: {} as Media[]
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
  <div
      class="slider-wrapper"
      :class="{ 'sk-anim': mainStore.isLoading }"
  >
    <div class="media-slider" @scroll="scrollEvent">
      <MediaSlide
          v-show="!mainStore.isLoading"
          v-for="(slide, index) in slides"
          :key="index"
          :slide="slide"
          :class="{ active: isActiveSlide(index) }"
      />

      <!-- Skeleton loader -->
      <MediaSlide
          v-show="mainStore.isLoading"
          v-for="index in 14"
          :key="index"
      />

      <div class="pseudo-slide"></div>
      <div class="pseudo-slide"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/media-slider.scss";
</style>
