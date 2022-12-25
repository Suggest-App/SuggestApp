<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import ShuffleCard from "@/components/home-view/ShuffleCard.vue";
</script>

<template>
  <section id="home-view">
    <ShuffleCard v-for="index in 25" :key="index" />
    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/home-view/home-view.scss";
</style>
