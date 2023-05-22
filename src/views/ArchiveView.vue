<script setup lang="ts">
import router from "@/router";
import MediaList from "@/components/media/list/MediaList.vue";
import MediaListElement from "@/components/media/list/MediaListElement.vue";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import GoBackIcon from "@/components/icons/GoBackIcon.vue";
import { useMainStore } from "@/stores/MainStore";
import {secondsToTime} from "@/composables/MediaInformationFormatting";
import {computed, ComputedRef, onMounted} from "vue";
import { User } from "@/classes/User";
import { useProfileStore } from "@/stores/ProfileStore";
import ArchiveIcon from "@/components/icons/ArchiveIcon.vue";

const mainStore = useMainStore()
const profileStore = useProfileStore()

onMounted(async () => {
  // Fetch the hidden media
  await profileStore.fetchHiddenMedia()
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
  <main :class="{ active : profileStore.hiddenMediaCount <= 0 }">
    <ProfileTopNavigation v-show="!profileStore.hiddenMediaCount <= 0">
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
            v-if="profileStore.hiddenMediaCount.length < 1"
            v-show="mainStore.isLoading"
            v-for="index in 10"
            :key="index"
        />
      </template>
    </MediaList>

    <ArchiveIcon v-show="profileStore.hiddenMediaCount <= 0" />
    <p v-show="profileStore.hiddenMediaCount <= 0" class="empty-archive-text">{{ $t('archiveView.noMedia') }}</p>
  </main>
</template>

<style lang="scss">
main.active {
  @include flex-center-xy;
  flex-direction: column;

  svg {
    width: 40%;
    max-width: 140px;
    fill: #232323;
    margin: 0 auto 15px;
  }

  .empty-archive-text {
    color: #2f2e2e;
    font-weight: bold;
    font-size: 24px;
    padding: 0 15px;
    text-align: center;
  }
}

@media only screen and (min-width: 768px) {
  main.active {
    svg {
      max-width: 300px;
      fill: #313131;
    }

    .empty-archive-text {
      font-size: 32px;
      color: #424040;
    }
  }
}

@media only screen and (min-width: 991px) {
  .base-wrapper.nav-grid {
    margin-bottom: 78px;
  }

  .main .empty-archive-text {
    font-size: 40px;
  }
}
</style>
