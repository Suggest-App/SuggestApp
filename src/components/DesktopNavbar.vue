<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useMainStore } from "@/stores/MainStore";
import { useRoute } from "vue-router";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
import ProfileHeader from "@/components/profile-view/ProfileHeader.vue";
import ConnectedAppsBtn from "@/components/profile-view/ConnectedAppsBtn.vue";
import GearIcon from "@/components/icons/controls/GearIcon.vue";
import MessagesViewIcon from "@/components/icons/navbar/MessagesViewIcon.vue";

const mainStore = useMainStore()
const route = useRoute()

const isRecommendedView: ComputedRef<boolean> = computed((): boolean => {
  return (route.path.includes('recommended-media'))
})
</script>

<template>
  <nav id="desktop-navbar">
    <ProfileHeader />

    <RouterLink :to="{ name: 'MatchesView' }" :class="{ active: isRecommendedView }">
      <RankingViewIcon />
      <span>matches</span>
    </RouterLink>
    <RouterLink :to="{ name: 'MessagesView' }">
      <MessagesViewIcon />
      <span>Chats</span>
    </RouterLink>
    <RouterLink :to="{ name: 'ProfileView' }">
      <ProfileViewIcon />
      <span>Profile</span>
    </RouterLink>
    <RouterLink :to="{ name: 'SettingsView' }">
      <GearIcon />
      <span>Settings</span>
    </RouterLink>

    <ConnectedAppsBtn v-if="mainStore.isDesktop" />
  </nav>
</template>

<style lang="scss">
@import "@/assets/scss/desktop-navbar.scss";
</style>
