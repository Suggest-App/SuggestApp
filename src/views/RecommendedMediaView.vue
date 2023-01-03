<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import RecommendedMediaHeader from "@/components/recommended-media-view/RecommendedMediaHeader.vue";
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
</script>

<template>
  <section id="recommended-media-view">

    <RouterLink :to="{ name: 'MatchesView' }">
      <ArrowLeftIcon />
    </RouterLink>

    <RecommendedMediaHeader />
    <h3>Those are Tobe’s favorite tracks you don’t know</h3>

    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/recommended-media-view/recommended-media-view.scss";
</style>
