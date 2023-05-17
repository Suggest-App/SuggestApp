<script setup lang="ts">
import { useProfileStore } from "@/stores/ProfileStore";
import { useMainStore } from "@/stores/MainStore";
import {computed, onMounted} from "vue";
import type { ComputedRef } from "vue";
import HeadingWrapper from "@/components/HeadingWrapper.vue";
import ProfileImageWrapper from "@/components/ProfileImageWrapper.vue";
import ProfileInfoColumn from "@/components/ProfileInfoColumn.vue";
import MediaList from "@/components/media/list/MediaList.vue";
import ProfileInfoGrid from "@/components/ProfileInfoGrid.vue";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import SettingsButton from "@/components/icons/SettingsButton.vue";
import ConnectedAppsBtn from "@/components/icons/ConnectedAppsBtn.vue";
import { User } from "@/classes/User";

const mainStore = useMainStore()
const profileStore = useProfileStore()

onMounted(async () => {
  // Fetch the profile information and set the user object properties
  await profileStore.fetchRecommendedMediaSummary()
      .then(() => mainStore.isLoading = false)
      .catch(e => console.log(e))
})

// The user profile object from the store
const profile: ComputedRef<User> = computed(() => {
  return (profileStore.profile instanceof User) ? profileStore.profile : new User()
})
</script>

<template>
  <main id="recommended-media-view">

    <HeadingWrapper :heading="$t('headingWrapper.heading.allMatchesRecommendation')">
      <template #label>
        <span>{{ $t('headingWrapper.label.listenedBy') }}</span>
      </template>
    </HeadingWrapper>

    <MediaList :media-list="profile.getRecommendedMediaSummary()" />
  </main>
</template>
