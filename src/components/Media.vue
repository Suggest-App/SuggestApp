<script setup lang="ts">
import type {ComputedRef, PropType} from "vue";
import type { MediaSummary } from "@/models/MediaSummary";
import { computed } from "vue";

const props = defineProps({
  media: {
    type: Object as PropType<MediaSummary>,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
})

// Access index prop and increment it, in order to use it as rank
const rank: ComputedRef<number> = computed((): number => {
  return props.index + 1
})

// Access song title prop
const songTitle: ComputedRef<string> = computed((): string => {
  return (props.media && props.media.songTitle)
      ? props.media.songTitle
      : 'no title available'
})

// Access username prop
const artists: ComputedRef<string> = computed((): string => {
  return (props.media && props.media.allArtists)
      ? props.media.allArtists.join().replace(',', ', ')
      : 'no artists available'
})

// Flag that indicates if title is explicit
const isExplicit: ComputedRef<boolean> = computed((): boolean => {
  return props.media && props.media.explicitFlag
})

// Access album image prop
const albumImage = computed(() => {
  return (props.media && props.media.albumImages)
      ? props.media.albumImages[0].imageUrl
      : 'no album image available'
})
</script>

<template>
  <div class="media-container">
    <div class="rank">{{ rank }}</div>
      <img
          class="media-cover"
          :src="albumImage"
          alt="album cover"
      />
    <div class="media-information">
      <p class="media-title">{{ songTitle }}</p>
      <div class="additional-media-info">
        <div v-if="isExplicit" class="explicit">E</div>
        <p class="artists">{{ artists }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/media.scss";
</style>
