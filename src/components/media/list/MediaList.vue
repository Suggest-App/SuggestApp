<script lang="ts" setup>
import type { PropType } from "vue";
import type { Media } from "@/models/Media";
import MediaListElement from "@/components/media/list/MediaListElement.vue";
import { useMainStore } from "@/stores/MainStore";

const mainStore = useMainStore()

defineProps({
  mediaList: {
    type: Object as PropType<Media[]>,
    required: true
  }
})
</script>

<template>
  <div class="base-wrapper">
    <MediaListElement
        v-show="!mainStore.isLoading"
        v-for="(media, index) in mediaList"
        :key="index"
        :index="index"
        :media="media"
    />

    <!-- Skeleton loader -->
    <MediaListElement
        v-show="mainStore.isLoading"
        v-for="index in 10"
        :key="index"
    />
  </div>
</template>
