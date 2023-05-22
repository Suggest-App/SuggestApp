<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import type { ComputedRef } from "vue";
import { RouterView, useRoute } from 'vue-router'
import { useMainStore } from "@/stores/MainStore";
import MobileNavbar from "@/components/MobileNavbar.vue";
import {checkUrlToken, setCookie, validateUser} from "@/services/TokenService";
import DesktopNavbar from "@/components/DesktopNavbar.vue";

console.log(import.meta.env)

const mainStore = useMainStore()
const route = useRoute()

// Check if the navbar should be rendered
const showNavbar: ComputedRef<boolean> = computed((): boolean => {
  return !!(route.meta.showNavbar)
})

onMounted(async () => {
  // Check after mound if window with is desktop
  mainStore.isDesktop = (window.innerWidth >= 768)
  await validateUser()
  await checkUrlToken()
})
</script>

<template>
  <DesktopNavbar v-if="showNavbar && mainStore.isDesktop" />
  <RouterView />
  <MobileNavbar v-if="showNavbar && !mainStore.isDesktop" />
</template>

