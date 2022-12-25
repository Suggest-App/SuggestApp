<script setup lang="ts">
import ShuffleViewIcon from "@/components/icons/navbar/ShuffleViewIcon.vue";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
</script>

<template>
  <nav id="navbar">
    <RouterLink :to="{ name: 'ShuffleView' }">
      <ShuffleViewIcon  color="#FFFFFF" />
      <span></span>
    </RouterLink>
    <RouterLink :to="{ name: 'RankingView' }">
      <RankingViewIcon color="#FFFFFF" />
      <span></span>
    </RouterLink>
    <RouterLink :to="{ name: 'ProfileView' }">
      <ProfileViewIcon color="#FFFFFF" />
      <span></span>
    </RouterLink>
  </nav>
</template>



<style lang="scss">
@import "@/assets/scss/navbar.scss";
</style>
