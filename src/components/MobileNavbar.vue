<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useRoute } from "vue-router";
import MatchesViewIcon from "@/components/icons/navbar/MatchesViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
import RecommendedMediaViewIcon from "@/components/icons/navbar/RecommendedMediaViewIcon.vue";

const route = useRoute()

const inMatchingProfileView: ComputedRef<boolean> = computed((): boolean => {
  return (route.path.includes('matching-profile'))
})
</script>

<template>
  <nav id="mobile-navbar">

    <RouterLink :to="{ name: 'recommended-media' }">
      <RecommendedMediaViewIcon />
      <span>{{ $t('navbar.recommendedMedia') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'matches' }" :class="{ active: inMatchingProfileView }">
      <MatchesViewIcon />
      <span>{{ $t('navbar.matches') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'profile' }">
      <ProfileViewIcon />
      <span>{{ $t('navbar.profile') }}</span>
    </RouterLink>

  </nav>
</template>

<style lang="scss">
#mobile-navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 40px 35px;
  z-index: 50;

  a {
    @include flex-center-xy;
    flex-direction: column;
    row-gap: 8px;
  }

  svg {
    width: 22px;
    height: 20px;
  }

  span {
    font-size: $font-size-s;
  }

  a, span, svg {
    z-index: 5;
  }
}

#mobile-navbar::before {
  content: '';
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0));
  pointer-events: none;
}
</style>
