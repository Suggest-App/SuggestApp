<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { ComputedRef } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useMainStore } from "@/stores/MainStore";
import MobileNavbar from "@/components/MobileNavbar.vue";
import DesktopNavbar from "@/components/DesktopNavbar.vue";
import Popup from "@/components/Popup.vue";

const mainStore = useMainStore()
const route = useRoute()

// Check if the navbar should be rendered
const showNavbar: ComputedRef<boolean> = computed((): boolean => {
  return !!(route.meta.showNavbar)
})

onMounted(async () => {
  // Check after mound if window with is desktop
  mainStore.isDesktop = (window.innerWidth >= 768)
})


</script>

<template>
  <MobileNavbar v-if="showNavbar && !mainStore.isDesktop" />
  <DesktopNavbar v-if="showNavbar && mainStore.isDesktop" />
  <RouterView />
  <Popup />
</template>
