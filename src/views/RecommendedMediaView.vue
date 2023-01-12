<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { ComputedRef } from "vue";
import { useRoute } from "vue-router";
import { useMatchesStore } from "@/stores/MatchesStore";
import RecommendedMediaHeader from "@/components/recommended-media-view/RecommendedMediaHeader.vue";
import MatchesService from "@/services/MatchesService";
import Media from "@/components/Media.vue";
import RecommendedMediaViewSkeleton from "@/components/recommended-media-view/RecommendedMediaViewSkeleton.vue";

const matchesStore = useMatchesStore();



// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (matchesStore.matchesMap.has(userId) && matchesStore.matchesMap.get(userId))
      ? matchesStore.matchesMap.get(userId)!.username
      : 'no username available'
})

// Get the user id from the route
const route = useRoute()
const userId: string = route.params.id as string

onMounted( async () => {
  matchesStore.recommendedMedia = await MatchesService.fetchRecommendedMedia(userId);

  // Ensure that there are matches fetched, before disabling the loading flag
  if (matchesStore.recommendedMedia.length !== 0) {
    matchesStore.isLoading = false
  }
})
</script>

<template>
  <section id="recommended-media-view">
    <RecommendedMediaHeader
        v-show="!matchesStore.isLoading"
        :user-id="userId"
    />

    <div v-show="!matchesStore.isLoading" class="media-scroll-container">
      <h3>Those are {{ username }}’s favorite tracks you don’t know</h3>
      <Media
          v-for="(media, index) in matchesStore.recommendedMedia"
          :key="index"
          :index="index"
          :media="media"
      />
    </div>

    <RecommendedMediaViewSkeleton v-if="matchesStore.isLoading" />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/recommended-media-view/recommended-media-view.scss";
</style>
