<script setup lang="ts">
import { useProfileStore } from "@/stores/ProfileStore";
import { useMainStore } from "@/stores/MainStore";
import {computed, onMounted} from "vue";
import type { ComputedRef } from "vue";
import HeadingWrapper from "@/components/HeadingWrapper.vue";
import MediaList from "@/components/media/list/MediaList.vue";
import MediaListElement from "@/components/media/list/MediaListElement.vue";
import { User } from "@/classes/User";
import MediaListElementMatchInfo from "@/components/MediaListElementMatchInfo.vue";
import HideMediaIcon from "@/components/icons/HideMediaIcon.vue"
import ArchiveBtn from "@/components/ArchiveBtn.vue"

const mainStore = useMainStore()
const profileStore = useProfileStore()

onMounted(async () => {
  // Fetch the profile information and set the user object properties
  await profileStore.getDiscoverMediaSummary()
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
        <span class="hide-icon-wrapper">
          <HideMediaIcon />
          <span class="label">{{ $t('headingWrapper.label.hide') }}</span>
        </span>
      </template>
    </HeadingWrapper>

    <ArchiveBtn v-show="profileStore.selectMediaFlag && !mainStore.isDesktop" />

    <MediaList>
      <template #media-elements>
        <MediaListElement
            v-show="!mainStore.isLoading"
            v-for="(media, index) in profile.getDiscoverMediaSummary()"
            :key="index"
            :index="index"
            :media="media"
            default-origin="discover"
        >
          <template #right>
            <MediaListElementMatchInfo :media="media"/>
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
.base-wrapper.heading .label {
  width: 110px;
  text-align: center;
}

.hide-icon-wrapper {
  @include flex-center-xy;
  flex-direction: column;
  row-gap: 4px;
}
</style>