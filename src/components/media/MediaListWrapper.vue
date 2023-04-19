<script lang="ts" setup>
import ListMedia from "@/components/media/ListMedia.vue";
import { useMatchesStore } from "@/stores/MatchesStore";
import type {PropType} from "vue";
import type {MediaSummary} from "@/models/MediaSummary";
const matchesStore = useMatchesStore()

defineProps({
  mediaList: {
    type: Object as PropType<MediaSummary[]>,
    required: true
  }
})
</script>

<template>
  <div class="media-list-container">
    <ListMedia
        v-for="(media, index) in mediaList"
        :key="index"
        :media="media"
        :index="index"
    />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/media/media-list.scss";
</style>
