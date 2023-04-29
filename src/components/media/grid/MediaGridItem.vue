<script lang="ts" setup>
import type { ComputedRef, PropType } from "vue";
import type { Media } from "@/models/Media";
import { computed } from "vue";
import MediaImage from "@/components/media/list/MediaListImage.vue";
import ListMediaElementInfo from "@/components/media/list/ListMediaElementInfo.vue";
import MediaTrackingInformation from "@/components/MediaTrackingInformation.vue";

const props = defineProps({
  media: {
    type: Object as PropType<Media>,
    required: true
  }
})

const mediaEl: ComputedRef<Media> = computed(() => props.media)

// Access artist prop
const artists: ComputedRef<string> = computed(
    () => props.media.allArtists.join().replace(',', ', ')
)

// Access media image url
const mediaImage: ComputedRef<string> = computed(
    () => props.media.albumImages[1].imageUrl
)
</script>

<template>
  <div class="grid-media-wrapper">
    <MediaImage :src="mediaImage" />

    <ListMediaElementInfo
        :song-title="mediaEl.songTitle"
        :artists="artists"
        :is-explicit="mediaEl.explicitFlag"
    />

    <MediaTrackingInformation
      :listened-seconds-you="mediaEl.listenedSecondsYou"
      :listened-seconds-match="mediaEl.listenedSecondsMatch"
    />
  </div>
</template>

<style lang="scss">
.grid-media-wrapper {
  width: 100%;

  .media-image {
    width: 100%;
    height: unset;
    aspect-ratio: 1 / 1;
    margin-bottom: 10px;
    background-color: grey;
  }
}
</style>
