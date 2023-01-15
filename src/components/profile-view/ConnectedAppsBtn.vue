<script setup lang="ts">
import LinkIcon from "@/components/icons/controls/LinkIcon.vue";
import ArrowRightIcon from "@/components/icons/controls/ArrowRightIcon.vue";
</script>

<template>
  <div class="connected-apps-btn">
    <LinkIcon />
    <p>(1) {{ $t('profileView.connectedAppLabel') }}</p>
    <ArrowRightIcon />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/profile-view/connect-app-btn.scss";
</style>
