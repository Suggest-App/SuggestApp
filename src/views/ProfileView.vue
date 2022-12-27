<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <section id="profile-view">
    <header>
      <div class="profile-image"></div>
      <div class="header-info-wrapper">
        <h3 class="profile-name">Benutzername</h3>
      </div>
    </header>

    <Navbar />
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/profile-view/profile-view.scss";
</style>
