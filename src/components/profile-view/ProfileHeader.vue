<script setup lang="ts">
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import { ref, computed, onMounted} from "vue";
import type { Ref, ComputedRef } from "vue";
import { trackingSinceDate } from "@/composables/TimeCalculations";
import { useProfileStore } from "@/stores/ProfileStore";
import ProfileService from "@/services/ProfileService";

const profileStore = useProfileStore()

onMounted(async () => {
  // Fetch the profile information, if the object is empty
  if (JSON.stringify(profileStore.profileInformation) === '{}') {
    profileStore.profileInformation  = await ProfileService.fetchProfileInformation()
  }
})

// Access of username property
const profileImage: ComputedRef<string> = computed((): string => {
  return (profileStore.profileInformation && profileStore.profileInformation.profileImage)
      ? profileStore.profileInformation.profileImage
      : 'no profile image available'
})

// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (profileStore.profileInformation && profileStore.profileInformation.username)
      ? profileStore.profileInformation.username
      : 'no username available'
})

// Bool that indicates if tracking since should be displayed
const showTrackingSince: Ref<boolean> = ref(profileStore.profileInformation.trackingSince != null)

// Value since when user records are getting tracked
const trackingSince: ComputedRef<string> = computed((): string => {
  return (profileStore.profileInformation && showTrackingSince.value)
    ? trackingSinceDate(profileStore.profileInformation.trackingSince)
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
      <p v-if="showTrackingSince">tracking since: {{ trackingSince }} <InfoIcon /></p>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import "@/assets/scss/profile-view/profile-header.scss";
</style>
