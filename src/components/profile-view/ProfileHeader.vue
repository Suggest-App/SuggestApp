<script setup lang="ts">
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import type {ComputedRef} from "vue";
import {computed, onMounted} from "vue";
import {trackingSinceDate} from "@/composables/TimeCalculations";
import {useProfileStore} from "@/stores/ProfileStore";
import ProfileService from "@/services/ProfileService";
import {trackingSincePopup} from "@/composables/InformationPopup";
import GearIcon from "@/components/icons/controls/GearIcon.vue";
import { useMainStore } from "@/stores/MainStore";
import { useI18n } from "vue-i18n";
import ProfileImage from "@/components/icons/ProfileImage.vue";

const { t } = useI18n()

const profileStore = useProfileStore()
const mainStore = useMainStore()

onMounted(async () => {
  // Fetch the profile information, if the object is empty
  if (JSON.stringify(profileStore.profileInformation) === '{}') {
    profileStore.profileInformation  = await ProfileService.fetchProfileInformation()
  }
})

/************************** Template Variables **************************/

// Access of username property
const profileImage: ComputedRef<string | null> = computed((): string| null => {
  return (profileStore.profileInformation && profileStore.profileInformation.profileImage)
      ? profileStore.profileInformation.profileImage
      : null
})

// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (profileStore.profileInformation && profileStore.profileInformation.username)
      ? profileStore.profileInformation.username
      : t('profileView.placeholders.noTitle')
})

// Value since when user records are getting tracked
const trackingSince: ComputedRef<string> = computed((): string => {
  return (profileStore.profileInformation && profileStore.profileInformation.trackingSince != null)
    ? trackingSinceDate(profileStore.profileInformation.trackingSince)
    : t('profileView.placeholders.noMinutes')
})

</script>

<template>
  <header>
    <img
        v-if="profileImage"
        class="profile-image"
        :src="profileImage"
        alt="Profile image"
    />
    <ProfileImage
        v-if="!profileImage"
        class="profile-image placeholder"
    />
    <div class="profile-info">
      <h2>{{ username }}</h2>
      <p v-if="profileStore.profileInformation.trackingSince != null">{{ $t('profileView.trackingLabel') }}: {{ trackingSince }}
        <InfoIcon @click="trackingSincePopup"/>
      </p>
    </div>
    <RouterLink :to="{ name: 'SettingsView' }" v-if="!mainStore.isDesktop">
      <GearIcon />
    </RouterLink>

  </header>
</template>

<style scoped lang="scss">
@import "@/assets/scss/profile-view/profile-header.scss";
</style>
