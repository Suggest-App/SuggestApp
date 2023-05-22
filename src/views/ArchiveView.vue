<script setup lang="ts">
import router from "@/router";
import MediaList from "@/components/media/list/MediaList.vue";
import MediaListElement from "@/components/media/list/MediaListElement.vue";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import GoBackIcon from "@/components/icons/GoBackIcon.vue";
import { useMainStore } from "@/stores/MainStore";
import {secondsToTime} from "@/composables/MediaInformationFormatting";
import {computed, ComputedRef} from "vue";
import { User } from "@/classes/User";
import { useProfileStore } from "@/stores/ProfileStore";

const mainStore = useMainStore()
const profileStore = useProfileStore()

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
  <main>
    <ProfileTopNavigation>
      <template #left>
        <GoBackIcon @click="router.push({ name: 'profile'})" />
      </template>
      <template #middle>
        <h2>{{ $t('archiveView.heading') }}</h2>
      </template>
    </ProfileTopNavigation>

    <MediaList>
      <template #media-elements>
        <MediaListElement
            v-show="!mainStore.isLoading"
            v-for="(media, index) in profile.getHiddenMedia()"
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

<style lang="scss">
@media only screen and (min-width: 991px) {
  .base-wrapper.nav-grid {
    margin-bottom: 78px;
  }
}
</style>
