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
const profileImage = computed(() => {
  return 'url(' + props.profileInformation.profileImage + ')'
})

// access of username property
const username = computed(() => {
  return props.profileInformation.username
})

// value since when user records are getting tracked
const trackingSince = computed(() => {
  // Get date object based on datetime string
  let date = new Date(props.profileInformation.trackingSince);

  // get single date values and add 0 from german pattern if necessary
  let day = (date.getDay() < 10) ? '0' + date.getDay() : date.getDay()
  let month = (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth()
  let year = date.getFullYear()

  return day + '.' + month + '.' + year
})

// Only display tracking since phrase, if tracking value exists
const showTrackingSince = computed(() => {
  return props.profileInformation.trackingSince !== undefined
})

// Font size of username should be larger, if no tracking since value is displayed
const usernameFontSize = computed(() => {
  return (showTrackingSince.value ? 18 : 24) + 'px'
})
</script>

<template>
  <header>
    <div class="profile-image" :style="{ backgroundImage: profileImage }"></div>
    <div class="profile-info">
      <h2 :style="{ fontSize: usernameFontSize }">{{ username }}</h2>
      <p v-if="showTrackingSince">tracking since {{ trackingSince }} <InfoIcon /></p>
    </div>
  </header>
</template>
