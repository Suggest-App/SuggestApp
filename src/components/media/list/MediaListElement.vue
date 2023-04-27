<script lang="ts" setup>
import type { PropType, ComputedRef } from "vue";
import type { Media } from "@/models/Media";
import { computed } from "vue";
import { secondsToTime } from "@/composables/MediaInformationFormatting";
import { useI18n } from "vue-i18n";
import { useMainStore } from "@/stores/MainStore";
import MediaImage from "@/components/media/list/MediaListImage.vue";
import ListMediaElementInfo from "@/components/media/list/ListMediaElementInfo.vue";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()

const props =  defineProps({
  media: {
    type: Object as PropType<Media>,
    default: {} as Media
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
      : 'song title unknown'
})

// Access artist prop
const artists: ComputedRef<string> = computed(() => {
  return (props.media && props.media.allArtists)
      ? props.media.allArtists.join().replace(',', ', ')
      : 'artist unknown'
})

// Flag that indicates if title is explicit
const isExplicit: ComputedRef<boolean> = computed(() => {
  return props.media && props.media.explicitFlag
})

// Access media image url
const mediaImage: ComputedRef<string> = computed(() => {
  return (props.media && props.media.albumImages)
      ? props.media.albumImages[0].imageUrl
      : ''
})

// Time listened to a specific media
const trackedTime: ComputedRef<string> = computed(() => {
  return (props.media.listenedSeconds)
      ? secondsToTime(props.media.listenedSeconds)
      : ''
})

function openInSpotify(): void {
  if (props.media && props.media.linkToMedia) {
    window.open(props.media.linkToMedia)
  }
}
</script>

<template>
  <div class="media-element-wrapper" :class="{ 'sk-anim': mainStore.isLoading }" @click="openInSpotify">
    <span class="rank">{{ index + 1 }}</span>
    <MediaImage :src="mediaImage" />
    <ListMediaElementInfo
      :song-title="songTitle"
      :artists="artists"
      :is-explicit="isExplicit"
    />
    <span class="time">{{ trackedTime }}</span>
  </div>

</template>

<style lang="scss">
.media-element-wrapper {
  @include flex-center-y;
  column-gap: 12px;
  margin-bottom: 15px;

  .rank {
    @include flex-center-xy;
    width: 20px;
    font-size: $font-size-s;
  }

  .time {
    color: $secondary-text-color;
    font-size: $font-size-s;
  }
}
</style>
