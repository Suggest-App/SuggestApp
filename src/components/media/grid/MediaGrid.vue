<script lang="ts" setup>
import MediaGridItem from "@/components/media/grid/MediaGridItem.vue";
import type { Media } from "@/models/Media";
import type { PropType } from "vue";

defineProps({
  mediaList: {
    type: Object as PropType<Media[]>,
    required: true
  }
})
</script>

<template>
  <div class="base-wrapper media-grid">
    <MediaGridItem
        v-for="(media, index) in mediaList"
        :key="index"
        :media="media"
    />
  </div>
</template>

<style lang="scss">
.base-wrapper.media-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
</style>
