<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useMainStore } from "@/stores/MainStore";

const mainStore = useMainStore()

onMounted(async () => {
  // Check after mound if window with is desktop
  mainStore.isDesktop = (window.innerWidth >= 768)
})
</script>

<template>
  <RouterView />
</template>
