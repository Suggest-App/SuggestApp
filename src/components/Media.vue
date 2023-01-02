<script setup lang="ts">
import type { PropType } from "vue";
import type { MediaSummary } from "@/models/MediaSummary";
import {computed} from "vue";

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

// access of song title property
const songTitle = computed(() => {
  return (props.media.songTitle) ? props.media.songTitle : 'no title'
})

// access of username property
const artists = computed(() => {
  return (props.media.allArtists) ? props.media.allArtists.join().replace(',', ', ') : 'no artists'
})

// flag that indicates if title is explicit
const isExplicit = computed(() => {
  return props.media.explicitFlag
})

// access of album image property
const albumImage = computed(() => {
  return props.media.albumImages[0].imageUrl
})
</script>

<template>
  <div class="media-container">
    <div class="rank">{{ index + 1 }}</div>


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
