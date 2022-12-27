<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import mediaData from "@/data/media-data.json";
import MediaCard from "@/components/profile-view/MediaCard.vue";
</script>

<template>
  <section id="profile-view">
    <header>
      <slot name="controls"></slot>
      <div class="profile-image"></div>
      <div class="header-info-wrapper">
        <h3 class="profile-name">Benutzername</h3>
      </div>
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
