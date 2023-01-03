<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Match from "@/components/matches-view/Match.vue";
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
</script>

<template>
  <section id="matches-view">
    <h2>Your top matches <InfoIcon /></h2>
    <Match v-for="index in 15" :key="index" />
    <Navbar />
   </section>
 </template>

 <style lang="scss">
 @import "@/assets/scss/matches-view/matches-view.scss";
 </style>
