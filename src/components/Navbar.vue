<script setup lang="ts">
import ShuffleViewIcon from "@/components/icons/navbar/ShuffleViewIcon.vue";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
</script>

<template>
  <nav id="navbar">
    <RouterLink :to="{ name: 'ShuffleView' }">
      <ShuffleViewIcon />
      <span>Shuffle</span>
    </RouterLink>
    <RouterLink :to="{ name: 'RankingView' }">
      <RankingViewIcon />
      <span>matches</span>
    </RouterLink>
    <RouterLink :to="{ name: 'ProfileView' }">
      <ProfileViewIcon />
      <span>Profile</span>
    </RouterLink>
  </nav>
</template>



<style lang="scss">
@import "@/assets/scss/navbar.scss";
</style>
