<script setup lang="ts">
import { useProfileStore } from "@/stores/ProfileStore";
import { useMainStore } from "@/stores/MainStore";
import {computed, onMounted} from "vue";
import type { ComputedRef } from "vue";
import HeadingWrapper from "@/components/HeadingWrapper.vue";
import ProfileImageWrapper from "@/components/ProfileImageWrapper.vue";
import ProfileInfoColumn from "@/components/ProfileInfoColumn.vue";
import MediaList from "@/components/media/list/MediaList.vue";
import MediaListElement from "@/components/media/list/MediaListElement.vue";
import ProfileInfoGrid from "@/components/ProfileInfoGrid.vue";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import SettingsButton from "@/components/icons/SettingsButton.vue";
import ConnectedAppsBtn from "@/components/icons/ConnectedAppsBtn.vue";
import { User } from "@/classes/User";
import {secondsToTime} from "@/composables/MediaInformationFormatting";

const mainStore = useMainStore()
const profileStore = useProfileStore()

onMounted(async () => {
  // Fetch the profile information and set the user object properties
  await profileStore.fetchUserProfile()
      .then(() => mainStore.isLoading = false)
      .catch(e => console.log(e))
})

// The user profile object from the store
const profile: ComputedRef<User> = computed(() => {
  return (profileStore.profile instanceof User) ? profileStore.profile : new User()
})

// calculate listened time
function getListenedTime(seconds: number) {
  return (seconds)
      ? secondsToTime(seconds)
      : ''
}
</script>

<template>
  <main id="profile-view">
    <ProfileTopNavigation
        v-if="!mainStore.isDesktop"
        :has-loading-anim="true"
    >
      <template #right>
        <RouterLink :to="{ name: 'connected-apps' }">
          <ConnectedAppsBtn />
        </RouterLink>
        <RouterLink :to="{ name: 'settings' }">
          <SettingsButton />
        </RouterLink>
      </template>
    </ProfileTopNavigation>

    <ProfileImageWrapper
        v-if="!mainStore.isDesktop"
        :image-src="profile.getProfileImgSrc()"
    />

    <ProfileInfoGrid v-if="!mainStore.isDesktop">
      <template #columns>
        <ProfileInfoColumn
            :label-text="$t('profileInfo.totalListenedTime')"
            :value="profile.getTotalListenedTime()"
        />
        <ProfileInfoColumn
            :label-text="$t('profileInfo.songTrackingSince')"
            :value="profile.getTrackingSince()"
        />
        <ProfileInfoColumn
            :label-text="$t('profileInfo.lastFetch')"
            :value="profile.getLastFetched()"
        />
      </template>
    </ProfileInfoGrid>

    <HeadingWrapper :heading="$t('headingWrapper.heading.personalCompleteHistory')">
      <template #label>
        <span>{{ $t('headingWrapper.label.listenedTime') }}</span>
      </template>
    </HeadingWrapper>

    <MediaList>
      <template #media-elements>
        <MediaListElement
            v-show="!mainStore.isLoading"
            v-for="(media, index) in profile.getMediaSummary()"
            :key="index"
            :index="index"
            :media="media"
        >
          <template #right>
            <span class="time">{{ getListenedTime(media.listenedSeconds) }}</span>
          </template>
        </MediaListElement>
      </template>
      <template #skeleton-elements>
        <MediaListElement
            v-show="mainStore.isLoading"
            v-for="index in 10"
            :key="index"
        />
      </template>
    </MediaList>
  </main>
</template>
