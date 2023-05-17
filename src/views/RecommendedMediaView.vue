<script setup lang="ts">
import { useProfileStore } from "@/stores/ProfileStore";
import { useMainStore } from "@/stores/MainStore";
import {computed, onMounted} from "vue";
import type { ComputedRef } from "vue";
import HeadingWrapper from "@/components/HeadingWrapper.vue";
import MediaList from "@/components/media/list/MediaList.vue";
import MediaListElement from "@/components/media/list/MediaListElement.vue";
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

    <MediaList>
      <template #media-elements>
        <MediaListElement
            v-show="!mainStore.isLoading"
            v-for="(media, index) in profile.getRecommendedMediaSummary()"
            :key="index"
            :index="index"
            :media="media"
        />
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
