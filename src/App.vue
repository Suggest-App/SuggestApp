<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import type { ComputedRef } from "vue";
import { RouterView, useRoute } from 'vue-router'
import { useMainStore } from "@/stores/MainStore";
import MobileNavbar from "@/components/MobileNavbar.vue";
import { setCookie, validateUser} from "@/services/TokenService";
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
  setCookie('jwt', 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDc4NjllZi1kNTcxLTQ4ZWUtYjc0NC01YTIwZjQ2NjllOTciLCJuYW1lIjoiU2ViYXN0aWFuIENsYWVzIiwiZXhwIjoxNjgzOTc0Nzk1LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMiLCJpYXQiOjE2ODM3MTU1OTUsIm5iZiI6MTY4MzcxNTU5NX0.9fRmsHUf1fJ54DWUU6sDwQCp78PiumRUsES4KDxahWS4pzfALn8TiP0yWZ0VXhNnm-ePhd5h-2PYOnuT4IMKjA', 7)
  await validateUser()
})
</script>

<template>
  <DesktopNavbar v-if="showNavbar && mainStore.isDesktop" />
  <RouterView />
  <MobileNavbar v-if="showNavbar && !mainStore.isDesktop" />
</template>

