<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import mediaData from "@/data/media-data.json";
import MediaCard from "@/components/profile-view/MediaCard.vue";
</script>

<template>
  <section id="profile-view">
    <slot name="heading"></slot>
    <header>
      <div class="profile-image"></div>
      <div class="header-info-wrapper">
        <slot name="header"></slot>
      </div>
      <slot name="controls"></slot>
    </header>

    <MediaCard
        v-for="media in mediaData"
        :key="media.uuid"
        :media="media"
    />

    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/profile-view/profile-view.scss";
</style>
