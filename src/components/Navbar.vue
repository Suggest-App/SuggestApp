<script setup lang="ts">
import HomeViewIcon from "@/components/icons/navbar/HomeViewIcon.vue";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
</script>

<template>
  <nav id="navbar">
    <RouterLink :to="{ name: 'HomeView' }">
      <HomeViewIcon  color="#FFFFFF" />
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
