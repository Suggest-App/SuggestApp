<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import type { ComputedRef } from "vue";
import { RouterView, useRoute } from 'vue-router'
import { useMainStore } from "@/stores/MainStore";
import MobileNavbar from "@/components/MobileNavbar.vue";
import {setCookie} from "@/services/TokenService";
import DesktopNavbar from "@/components/DesktopNavbar.vue";

const mainStore = useMainStore()
const route = useRoute()

// Check if the navbar should be rendered
const showNavbar: ComputedRef<boolean> = computed((): boolean => {
  return !!(route.meta.showNavbar)
})

onMounted(async () => {
  // Check after mound if window with is desktop
  mainStore.isDesktop = (window.innerWidth >= 768)

  // setCookie('jwt', 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDY0ODhkZi0wMDgyLTRkZGYtZThlNC0wOGRiNDY2ZmM0MmIiLCJuYW1lIjoicy5jbGFlcyIsImV4cCI6MTY4Mjg0MjA0NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWF0IjoxNjgyNTgyODQ3LCJuYmYiOjE2ODI1ODI4NDd9.PhD9ObHJ54sU01iT9X2M_8_1bf5gQhu-KNHGZI1vHkD6-XrxYPh7diJ0I-vHLCKtW5fE9jZ3GuyLMAC-Jgih6g', 7)
})
</script>

<template>
  <DesktopNavbar v-if="showNavbar && mainStore.isDesktop" />
  <RouterView />
  <MobileNavbar v-if="showNavbar && !mainStore.isDesktop" />
</template>

