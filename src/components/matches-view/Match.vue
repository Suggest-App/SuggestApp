<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref, ComputedRef, PropType} from "vue";
import { Match } from "@/models/Match";
import { secondsToMinutes } from "@/composables/TimeCalculations";

const props = defineProps({
  match: {
    type: Object as PropType<Match>,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
})

// Access index prop and increment it, in order to use it as rank
const rank: ComputedRef<number> = computed((): number => {
  return props.index + 1
})

// Access profile image prop
const profileImage: ComputedRef<string> = computed((): string => {
  return (props.match && props.match.profileImage)
      ? props.match.profileImage
      : 'no profile image available'
})

// Access of username prop
const username: ComputedRef<string> = computed((): string => {
  return (props.match && props.match.username)
      ? props.match.username
      : 'no username available'
})

// Bool that indicates if together listened minutes should be displayed
const showMinutes: Ref<boolean> = ref(props.match.listenedTogetherSeconds != null)

// Value of how much  minutes both have listened together
const minutes:ComputedRef<string> = computed((): string => {
  return (props.match && showMinutes)
      ? secondsToMinutes(props.match.listenedTogetherSeconds)
      : "no minutes available"
})
</script>

<template>
  <div class="match-container">
    <div class="rank">{{ rank }}</div>
    <img
        class="profile-image"
        :src="profileImage"
        alt="Profile image"
    />
    <div class="profile-information">
      <p class="profile-name">{{ username }}</p>
      <p class="listened-together">{{ minutes }} minutes listened together</p>
    </div>
  </div>
</template>
