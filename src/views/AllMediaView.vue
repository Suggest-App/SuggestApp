<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useMainStore } from "@/stores/MainStore";
import { useMatchesStore } from "@/stores/MatchesStore";
import { useRoute } from "vue-router";
import MediaGrid from "@/components/media/grid/MediaGrid.vue";
import {computed, onMounted, ref} from "vue";
import type { ComputedRef, Ref } from "vue";
import { UserMatch } from "@/classes/UserMatch";
import type { Media } from "@/models/Media";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import GoBackIcon from "@/components/icons/GoBackIcon.vue";
import router from "@/router";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore();
const matchesStore = useMatchesStore();

// Get the user id from the current route
const route = useRoute()
const userId: string = route.params.id as string
const endpoint: string = route.params.endpoint as string

onMounted(async () => {

  // Fetch the user match properties and update the UserMach object from the map based on its uid
  await matchesStore.fetchAllMedia(userId, endpoint)
      .then(() => mainStore.isLoading = false)
      .catch(e => console.log(e))
})

const heading: Ref<string> = ref('')

// Get the user match from the map by its uid
const match: ComputedRef<UserMatch> = computed(
    () => matchesStore.getUserMatchByUid(userId)
)

const media: ComputedRef<Media[]> = computed(() => {
  switch (endpoint) {
    default:
    case '/together-consumed':
      heading.value = t('headingWrapper.heading.togetherConsumed')
      return match.value.getTogetherConsumedMedia()
    case '/recommended-media':
      heading.value = match.value.getUsername() + t('headingWrapper.heading.recommendedMedia')
      return match.value.getRecommendedMedia()
  }
})
</script>

<template>
  <main>
    <ProfileTopNavigation :has-loading-anim="true">
      <template #left>
        <GoBackIcon @click="router.push({ name: 'matching-profile', params: { id: userId }})" />
      </template>
      <template #middle>
        <h2>{{ heading }}</h2>
      </template>
    </ProfileTopNavigation>

    <MediaGrid :media-list="media" />
  </main>
</template>
