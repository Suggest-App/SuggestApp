<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import ShuffleCard from "@/components/suffle-view/ShuffleCard.vue";
import songData from "@/data/song-data.json";
</script>

<template>
  <section id="home-view">
    <ShuffleCard
        v-for="song in songData"
        :key="song.uuid"
        :song="song"
    />
    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/shuffle-view/shuffle-view.scss";
</style>
@
