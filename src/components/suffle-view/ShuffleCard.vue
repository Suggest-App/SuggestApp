<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import SpotifyControls from "@/components/suffle-view/SpotifyControls.vue";
import { Song } from "@/models/Song";

const props = defineProps({
  song: {
    type: Object as PropType<Song>,
    default: '',
  },
})

const coverUrl = computed(() => {
  return (props.song.songCover === '')
    ? 'url("@/assets/images/music_placeholder.png");'
    : 'url(data:image/png;base64,' + props.song.songCover + ')'
})

</script>

<template>
  <div class="shuffle-card">
    <div
        class="song-image"
        :style="{ 'background-image': coverUrl }"
    ></div>
    <h3 class="song-title">{{ song.songTitle }}</h3>
    <p class="artist">{{ song.artist }}</p>
    <SpotifyControls />
  </div>
</template>
