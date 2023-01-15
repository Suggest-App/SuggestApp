<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useRoute } from "vue-router";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
import MessagesViewIcon from "@/components/icons/navbar/MessagesViewIcon.vue";

const route = useRoute()

const isRecommendedView: ComputedRef<boolean> = computed((): boolean => {
  return (route.path.includes('recommended-media'))
})
</script>

<template>
  <nav id="mobile-navbar">
    <RouterLink :to="{ name: 'MatchesView' }" :class="{ active: isRecommendedView }">
      <RankingViewIcon />
      <span>{{ $t('navbar.matches') }}</span>
    </RouterLink>
    <RouterLink :to="{ name: 'MessagesView' }">
      <MessagesViewIcon />
      <span>{{ $t('navbar.chats') }}</span>
    </RouterLink>
    <RouterLink :to="{ name: 'ProfileView' }">
      <ProfileViewIcon />
      <span>{{ $t('navbar.profile') }}</span>
    </RouterLink>
  </nav>
</template>

<style lang="scss">
@import "@/assets/scss/mobile-navbar.scss";
</style>
