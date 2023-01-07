<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import { useMatchesStore } from "@/stores/MatchesStore";
import { Match } from "@/models/Match";
import { secondsToMinutes } from "@/composables/TimeCalculations";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})

const matchesStore = useMatchesStore()

const hasMatch: Ref<boolean> = ref(matchesStore.matchesMap.has(props.userId))
const match: Match = matchesStore.matchesMap.get(props.userId)!

// Access of profile image property
const profileImage: ComputedRef<string> = computed((): string => {
  return (hasMatch && match.profileImage)
      ? match.profileImage
      : 'no profile image available'
})

// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (hasMatch && match.username)
      ? match.username
      : 'no username available'
})

// Access of rank property
const rank: ComputedRef<string> = computed((): string => {
  return (hasMatch && match.rank)
      ? (match.rank).toString()
      : 'no rank available'
})

// Calculate together listened minutes
const minutes: ComputedRef<string> = computed((): string => {
  return secondsToMinutes(match.listenedTogetherSeconds)
})

</script>

<template>
  <header>
    <img class="profile-image" :src="profileImage" alt="Profile image" />
    <div class="profile-info">
      <h2>#{{ rank }} {{ username }}</h2>
      <p>{{ minutes }} minutes listened together</p>
    </div>
  </header>
</template>
