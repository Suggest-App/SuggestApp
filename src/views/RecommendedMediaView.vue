<script setup lang="ts">
import RecommendedMediaHeader from "@/components/recommended-media-view/RecommendedMediaHeader.vue";
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
import {onMounted} from "vue";
import {useMatchesStore} from "@/stores/MatchesStore";
import MatchesService from "@/services/MatchesService";
import Media from "@/components/Media.vue";
import router from "@/router";

const recommendedMediaStore = useMatchesStore();

onMounted( async () => {
  if (recommendedMediaStore.selectedMatch) {
    recommendedMediaStore.recommendedMedia = await MatchesService.fetchRecommendedMedia(recommendedMediaStore.selectedMatch.userId);
  } else {
    router.push('/matches')
  }
})
</script>

<template>
  <section id="recommended-media-view">
    <RouterLink :to="{ name: 'MatchesView' }">
      <ArrowLeftIcon />
    </RouterLink>

    <RecommendedMediaHeader />
    <h3>Those are Tobe’s favorite tracks you don’t know</h3>
    <Media :media="media" :index="index" v-for="(media,index) in recommendedMediaStore.recommendedMedia"/>
    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/recommended-media-view/recommended-media-view.scss";
</style>
