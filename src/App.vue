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

  setCookie('jwt', 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDc4NjllZi1kNTcxLTQ4ZWUtYjc0NC01YTIwZjQ2NjllOTciLCJuYW1lIjoicy5jbGFlcyIsImV4cCI6MTY4MzIxNzI3MywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaWF0IjoxNjgyOTU4MDczLCJuYmYiOjE2ODI5NTgwNzN9.rL-gRuQg699Q2p1dQb9sAZxouftZjvLaxeQYS_WEMqdGrh7XzyikpKvQUceuo1ITu_lWEitXTUot49ug2eUJzA', 7)
})
</script>

<template>
  <DesktopNavbar v-if="showNavbar && mainStore.isDesktop" />
  <RouterView />
  <MobileNavbar v-if="showNavbar && !mainStore.isDesktop" />
</template>

