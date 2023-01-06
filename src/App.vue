<script setup lang="ts">
import MobileNavbar from "@/components/MobileNavbar.vue";
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useMainStore } from "@/stores/MainStore";
import DesktopNavbar from "@/components/DesktopNavbar.vue";

const mainStore = useMainStore()

onMounted(async () => {
  // Check after mound if window with is desktop
  mainStore.isDesktop = (window.innerWidth >= 768)
})
</script>

<template>
  <MobileNavbar v-if="!mainStore.isDesktop" />
  <DesktopNavbar v-if="mainStore.isDesktop" />
  <RouterView />
</template>
