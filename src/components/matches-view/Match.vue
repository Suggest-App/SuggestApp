<script setup lang="ts">
import {computed, ComputedRef, PropType} from "vue";
import { Match } from "@/models/Match";
import {secondsToMinutes} from "@/composables/TimeCalculations";

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
console.log(props.match)
const minutes:ComputedRef<string> = computed(() => {
  return props.match
      ? secondsToMinutes(props.match?.listenedTogetherSeconds)
      : ""
})
</script>

<template>
  <div class="match-container">
    <div class="rank">{{props.index+1}}</div>
    <img
        class="profile-image"
        :src="props.match.profileImage"
        alt="Profile image"
    />
    <div class="profile-information">
      <p class="profile-name">{{props.match.username}}</p>
      <p class="listened-together">{{minutes}} minutes listened together</p>
    </div>
  </div>
</template>
