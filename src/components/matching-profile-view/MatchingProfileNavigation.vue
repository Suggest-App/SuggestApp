<script lang="ts" setup>
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useMatchesStore } from "@/stores/MatchesStore";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

// Initialize localization plugin and stores
const { t } = useI18n()
const matchesStore = useMatchesStore();

// Props from parent component
const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

// Access the username property
const username: ComputedRef<string> = computed(() => {
  return (matchesStore.matchesMap.has(props.userId) && matchesStore.matchesMap.get(props.userId))
      ? matchesStore.matchesMap.get(props.userId)!.username
      : t('matchesView.placeholders.noUsername')
})
</script>

<template>
  <div class="profile-navigation">
    <RouterLink :to="{ name: 'MatchesView' }">
      <ArrowLeftIcon />
    </RouterLink>
    <h2>This is {{ username }}</h2>
    <button class="follow-button">Folgen</button>
  </div>
</template>
