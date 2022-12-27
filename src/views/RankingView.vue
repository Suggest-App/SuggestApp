<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import RankingCard from "@/components/ranking-view/RankingCard.vue";
</script>

<template>
  <section id="ranking-view">
    <RankingCard v-for="card in 12" :key="card" />
    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/ranking-view/ranking-view.scss";
</style>
