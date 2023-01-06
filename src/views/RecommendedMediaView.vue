<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMatchesStore } from "@/stores/MatchesStore";
import RecommendedMediaHeader from "@/components/recommended-media-view/RecommendedMediaHeader.vue";
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
import MatchesService from "@/services/MatchesService";
import Media from "@/components/Media.vue";

const matchesStore = useMatchesStore();

onMounted( async () => {
  const route = useRoute()
  const userId: string = route.params.id as string
  matchesStore.recommendedMedia = await MatchesService.fetchRecommendedMedia(userId);
})
</script>

<template>
  <section id="recommended-media-view">
    <RouterLink :to="{ name: 'MatchesView' }">
      <ArrowLeftIcon />
    </RouterLink>

    <RecommendedMediaHeader />
    <h3>Those are Tobe’s favorite tracks you don’t know</h3>
    <Media :media="media" :index="index" v-for="(media,index) in matchesStore.recommendedMedia" />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/recommended-media-view/recommended-media-view.scss";
</style>
