<script setup lang="ts">
import router from "@/router";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import GoBackIcon from "@/components/icons/GoBackIcon.vue";
import ConnectedApp from "@/components/ConnectedApp.vue";
</script>

<template>
  <main>
    <ProfileTopNavigation>
      <template #left>
        <GoBackIcon @click="router.push({ name: 'profile'})" />
      </template>
      <template #middle>
        <h2>{{ $t('connectedAppsView.heading') }}</h2>
      </template>
    </ProfileTopNavigation>

    <!-- Spotify connection until now now slots or props needed-->
    <ConnectedApp />
  </main>
</template>

<style lang="scss">
@media only screen and (min-width: 991px) {
  .base-wrapper.nav-grid {
    margin-bottom: 65px;
  }
}
</style>
