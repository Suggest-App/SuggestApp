<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import ShuffleCard from "@/components/suffle-view/ShuffleCard.vue";
import mediaData from "@/data/media-data.json";
</script>

<template>
  <section id="home-view">
    <ShuffleCard
        v-for="media in mediaData"
        :key="media.uuid"
        :media="media"
    />
    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/shuffle-view/shuffle-view.scss";
</style>
@
