<script lang="ts" setup>
import ListMedia from "@/components/media/ListMedia.vue";
import { useMatchesStore } from "@/stores/MatchesStore";
const matchesStore = useMatchesStore()
</script>

<template>
  <div class="media-list-container">
    <ListMedia
        v-for="(media, index) in matchesStore.togetherConsumedMedia"
        :key="index"
        :media="media"
        :index="index"
    />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/media/media-list.scss";
</style>
