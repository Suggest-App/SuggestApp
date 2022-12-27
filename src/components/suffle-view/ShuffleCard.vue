<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import SpotifyControls from "@/components/suffle-view/SpotifyControls.vue";
import type { MediaInformation } from "@/models/MediaInformation";

const props = defineProps({
  media: {
    type: Object as PropType<MediaInformation>,
    default: '',
  },
})

const coverUrl = computed(() => {
  return (props.media.coverImage === '')
    ? 'url("@/assets/images/music_placeholder.png");'
    : 'url(data:image/png;base64,' + props.media.coverImage + ')'
})

</script>

<template>
  <div class="shuffle-card">
    <div
        class="song-image"
        :style="{ 'background-image': coverUrl }"
    ></div>
    <h3 class="song-title">{{ media.songTitle }}</h3>
    <p class="artist">{{ media.artist }}</p>
    <SpotifyControls />
  </div>
</template>
