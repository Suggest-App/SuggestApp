<script setup lang="ts">
import ShuffleViewIcon from "@/components/icons/navbar/ShuffleViewIcon.vue";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
</script>

<template>
  <nav id="navbar">
    <RouterLink :to="{ name: 'ShuffleView' }">
      <ShuffleViewIcon />
      <span></span>
    </RouterLink>
    <RouterLink :to="{ name: 'RankingView' }">
      <RankingViewIcon />
      <span></span>
    </RouterLink>
    <RouterLink :to="{ name: 'ProfileView' }">
      <ProfileViewIcon />
      <span></span>
    </RouterLink>
  </nav>
</template>



<style lang="scss">
@import "@/assets/scss/navbar.scss";
</style>
