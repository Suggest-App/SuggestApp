<script setup lang="ts">
import ProfileHeader from "@/components/profile-view/ProfileHeader.vue";
import ConnectedAppsBtn from "@/components/profile-view/ConnectedAppsBtn.vue";
import Navbar from "@/components/Navbar.vue";
import Media from "@/components/Media.vue";
</script>

<template>
  <div id="profile-view">
    <ProfileHeader />
    <ConnectedAppsBtn />
    <h3>Your favorite tracks</h3>
    <Media v-for="index in 12" />
    <Navbar />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/profile-view/profile-view.scss";
</style>
