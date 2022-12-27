<script setup lang="ts">
import { PropType } from "vue";
import { Media } from "@/models/Media";

const props = defineProps({
  media: {
    type: Object as PropType<Media>,
    required: true,
  },
})
</script>

<template>
  <div class="media-card">
    <div class="media-cover"></div>
    <div class="media-info-wrapper">
      <div class="artist">{{ props.media.artist }}</div>
      <h3 class="media-name">{{ props.media.mediaName }}</h3>
    </div>
  </div>
</template>
