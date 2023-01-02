<script setup lang="ts">
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import { computed } from "vue";
import type { PropType } from "vue";
import type { ProfileInformation } from "@/models/ProfileInformation";

const props = defineProps({
  profileInformation: {
    type: Object as PropType<ProfileInformation>,
    required: true,
  },
})

// access of username property
const username = computed(() => {
  return props.profileInformation.username
})

// value since when user records are getting tracked
const trackingSince = computed(() => {
  return props.profileInformation.tackingSince
})

// Only display tracking since phrase, if tracking value exists
const showTrackingSince = computed(() => {
  return props.profileInformation.tackingSince !== undefined
})

// Font size of username should be larger, if no tracking since value is displayed
const usernameFontSize = computed(() => {
  return (showTrackingSince.value ? 18 : 24) + 'px'
})

console.log(usernameFontSize.value)
</script>

<template>
  <header>
    <div class="profile-image"></div>
    <div class="profile-info">
      <h2 :style="{ 'font-size': usernameFontSize }">{{ username }}</h2>
      <p v-if="showTrackingSince">tracking since {{ trackingSince }} <InfoIcon /></p>
    </div>
  </header>
</template>
