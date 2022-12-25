<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <section id="home-view">
    <div class="container" v-for="index in 25" :key="index"></div>
    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/home-view/home-view.scss";
</style>
