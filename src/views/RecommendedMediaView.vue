<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { ComputedRef } from "vue";
import { useRoute } from "vue-router";
import { useMatchesStore } from "@/stores/MatchesStore";
import RecommendedMediaHeader from "@/components/recommended-media-view/RecommendedMediaHeader.vue";
import MatchesService from "@/services/MatchesService";
import Media from "@/components/Media.vue";
import RecommendedMediaViewSkeleton from "@/components/recommended-media-view/RecommendedMediaViewSkeleton.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n()

const matchesStore = useMatchesStore();

// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (matchesStore.matchesMap.has(userId) && matchesStore.matchesMap.get(userId))
      ? matchesStore.matchesMap.get(userId)!.username
      : t('matchesView.placeholders.noUsername')
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
      <a href="http://spotify.com/" target="_blank">
        <img
            class="spotify-logo"
            src="@/../public/images/Spotify_Logo_RGB_Green.png"
            alt="Spotify Logo RGB Green"
        />
      </a>
      <h3>{{$t('recommendedMediaView.headingPrefix') }} {{ username }}’s {{ $t('recommendedMediaView.headingSuffix') }}</h3>
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
