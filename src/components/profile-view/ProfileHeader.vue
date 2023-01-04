<script setup lang="ts">
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import { ref, computed } from "vue";
import type { Ref, PropType } from "vue";
import type { ProfileInformation } from "@/models/ProfileInformation";
import {trackingSinceDate} from "@/composables/TimeCalculations";

const props = defineProps({
  profileInformation: {
    type: Object as PropType<ProfileInformation>,
    required: true,
  },
})

console.log(props.profileInformation.username)
console.log(props.profileInformation.trackingSince)


// access of username property
const profileImage = computed(() => {
  return props.profileInformation.profileImage
})

// access of username property
const username = computed(() => {
  return props.profileInformation.username
})

// value since when user records are getting tracked
const showTrackingSince: Ref<boolean> = ref(props.profileInformation.trackingSince != null)

// value since when user records are getting tracked
const trackingSince = computed(() => {
  return (props.profileInformation && showTrackingSince.value)
    ? trackingSinceDate(props.profileInformation.trackingSince)
    : ''
})


// Font size of username should be larger, if no tracking since value is displayed
const usernameFontSize = computed(() => {
  return (showTrackingSince.value ? 18 : 24) + 'px'
})
</script>

<template>
  <header>
    <img class="profile-image" :src="profileImage" alt="Profile image" />
    <div class="profile-info">
      <h2 :style="{ fontSize: usernameFontSize }">{{ username }}</h2>
      <p v-if="showTrackingSince">tracking since {{ trackingSince }} <InfoIcon /></p>
    </div>
  </header>
</template>
