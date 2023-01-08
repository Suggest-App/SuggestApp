<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import { useMatchesStore } from "@/stores/MatchesStore";
import { Match } from "@/models/Match";
import { secondsToMinutes } from "@/composables/TimeCalculations";
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})

const matchesStore = useMatchesStore()

const hasMatch: Ref<boolean> = ref(matchesStore.matchesMap.has(props.userId))
const match: Ref<Match> = ref(matchesStore.matchesMap.get(props.userId)!)

// Access of profile image property
const profileImage: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.profileImage)
      ? match.value.profileImage
      : 'no profile image available'
})

// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.username)
      ? match.value.username
      : 'no username available'
})

// Access of rank property
const rank: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.rank)
      ? (match.value.rank).toString()
      : 'no rank available'
})

// Calculate together listened minutes
const minutes: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.listenedTogetherSeconds)
      ? secondsToMinutes(match.value.listenedTogetherSeconds)
      : 'no minutes available'
})

</script>

<template>
  <header>
    <RouterLink :to="{ name: 'MatchesView' }">
      <ArrowLeftIcon />
    </RouterLink>
    <img class="profile-image" :src="profileImage" alt="Profile image" />
    <div class="profile-info">
      <h2>#{{ rank }} {{ username }}</h2>
      <p>{{ minutes }} minutes listened together</p>
    </div>
  </header>
</template>
