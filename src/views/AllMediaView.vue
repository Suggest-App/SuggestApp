<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useMainStore } from "@/stores/MainStore";
import { useMatchesStore } from "@/stores/MatchesStore";
import { useRoute } from "vue-router";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore();
const matchesStore = useMatchesStore();

// Get the user id from the current route
const route = useRoute()

console.log(route.params.id)
console.log(route.params.listType)

</script>

<template>
  <main>

  </main>
</template>
