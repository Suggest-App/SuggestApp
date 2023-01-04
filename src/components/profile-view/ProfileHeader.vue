<script setup lang="ts">
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import {ref, computed, ComputedRef} from "vue";
import type { Ref, PropType } from "vue";
import type { ProfileInformation } from "@/models/ProfileInformation";
import {trackingSinceDate} from "@/composables/TimeCalculations";

const props = defineProps({
  profileInformation: {
    type: Object as PropType<ProfileInformation>,
    required: true,
  },
})

// Access of username property
const profileImage: ComputedRef<string> = computed((): string => {
  return (props.profileInformation && props.profileInformation.profileImage)
      ? props.profileInformation.profileImage
      : 'no profile image available'
})

// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (props.profileInformation && props.profileInformation.username)
      ? props.profileInformation.username
      : 'no username available'
})

// Bool that indicates if tracking since should be displayed
const showTrackingSince: Ref<boolean> = ref(props.profileInformation.trackingSince != null)

// Value since when user records are getting tracked
const trackingSince: ComputedRef<string> = computed((): string => {
  return (props.profileInformation && showTrackingSince.value)
    ? trackingSinceDate(props.profileInformation.trackingSince)
    : 'no tracking date available'
})

// Font size of username should be larger, if no tracking since value is displayed
const usernameFontSize: ComputedRef<string> = computed((): string => {
  return ((showTrackingSince.value) ? 18 : 24) + 'px'
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
