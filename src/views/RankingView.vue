<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import RankingCard from "@/components/ranking-view/RankingCard.vue";
import userData from "@/data/user-data.json";
</script>

<template>
  <section id="ranking-view">
    <RankingCard
        v-for="user in userData"
        :key="user.uuid"
        :user="user"
    />
    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/ranking-view/ranking-view.scss";
</style>
