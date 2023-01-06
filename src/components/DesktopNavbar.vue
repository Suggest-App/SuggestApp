<script setup lang="ts">
import ShuffleViewIcon from "@/components/icons/navbar/ShuffleViewIcon.vue";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
import ProfileHeader from "@/components/profile-view/ProfileHeader.vue";
import ConnectedAppsBtn from "@/components/profile-view/ConnectedAppsBtn.vue";
import { useMainStore } from "@/stores/MainStore";

const mainStore = useMainStore()
</script>

<template>
  <nav id="desktop-navbar">
    <ProfileHeader />

    <RouterLink :to="{ name: 'ShuffleView' }">
      <ShuffleViewIcon />
      <span>Shuffle</span>
    </RouterLink>
    <RouterLink :to="{ name: 'MatchesView' }">
      <RankingViewIcon />
      <span>matches</span>
    </RouterLink>
    <RouterLink :to="{ name: 'ProfileView' }">
      <ProfileViewIcon />
      <span>Profile</span>
    </RouterLink>

    <ConnectedAppsBtn v-if="mainStore.isDesktop" />
  </nav>
</template>

<style lang="scss">
@import "@/assets/scss/desktop-navbar.scss";
</style>
