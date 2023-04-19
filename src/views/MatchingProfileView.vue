<script lang="ts" setup>
import MatchingProfileNavigation from "@/components/matching-profile-view/MatchingProfileNavigation.vue";
import HeadingWrapper from "@/components/elements/HeadingWrapper.vue";
import ProfileStat from "@/components/elements/ProfileStat.vue";
import ListMedia from "@/components/media/ListMedia.vue";
import MediaSlider from "@/components/media/MediaSlider.vue";
import MatchingProfileImage from "@/components/matching-profile-view/MatchingProfileImage.vue";
import ProfileStatsWrapper from "@/components/elements/ProfileStatsWrapper.vue";
import {computed, ComputedRef, onMounted, ref} from "vue";
import { useRoute } from "vue-router";
import { useMatchesStore } from "@/stores/MatchesStore";
import { useI18n } from "vue-i18n";
import type { Ref } from "vue";
import type { Match } from "@/models/Match";
import MatchesService from "@/services/MatchesService";
import {secondsToTime, trackingSinceDate} from "@/composables/TimeCalculations";
import MediaListWrapper from "@/components/media/MediaListWrapper.vue";

// Initialize localization plugin and stores
const { t } = useI18n()
const matchesStore = useMatchesStore();

// Get the user id from the current route
const route = useRoute()
const userId: string = route.params.id as string

// Match related variables
const hasMatch: Ref<boolean> = ref(matchesStore.matchesMap.has(userId))
const match: Ref<Match> = ref(matchesStore.matchesMap.get(userId) as Match)

// Fetch media data after profile has been mounted
onMounted( async () => {
  matchesStore.recommendedMedia = await MatchesService.fetchRecommendedMedia(userId);
  matchesStore.togetherConsumedMedia = await MatchesService.fetchTogetherConsumedTracks(userId);

  // Ensure that there are matches fetched, before disabling the loading flag
  if (matchesStore.recommendedMedia.length !== 0) {
    matchesStore.isLoading = false
  }
})

/** --------------------- Template Properties --------------------- */

// The total time a users have listened to songs
const totalListenedTime: ComputedRef<string> = computed(() => {
  return (hasMatch.value && match.value.listenedTogetherSeconds)
      ? secondsToTime(match.value.listenedTogetherSeconds)
      : '-'
})

// Complete time two users have listened to the same songs
const togetherListenedTime: ComputedRef<string> = computed(() => {
  return (hasMatch.value && match.value.listenedTogetherSeconds)
      ? secondsToTime(match.value.listenedTogetherSeconds)
      : '-'
})

// Date since when the record history of a user is tracked
const songTrackingSince: ComputedRef<string> = computed(() => {
  return (hasMatch.value && match.value.listenedTogetherSeconds)
      ? trackingSinceDate('2023-01-03')
      : '-'
})

// Access the username property
const username: ComputedRef<string> = computed(() => {
  return (matchesStore.matchesMap.has(userId) && matchesStore.matchesMap.get(userId))
      ? matchesStore.matchesMap.get(userId)!.username
      : t('matchingProfileView.errors.unknownUser')
})
</script>

<template>
  <MatchingProfileNavigation
      :user-id="userId"
      :username="username"
  />

  <MatchingProfileImage
      :has-match="hasMatch"
      :match="match"
  />

  <ProfileStatsWrapper>
      <ProfileStat
          :value="totalListenedTime"
          :label-text="$t('profileStats.totalListenedTime')"
      />
      <ProfileStat
          :value="togetherListenedTime"
          :label-text="$t('profileStats.togetherListenedTime')"
      />
      <ProfileStat
          :value="songTrackingSince"
          :label-text="$t('profileStats.songTrackingSince')"
      />
  </ProfileStatsWrapper>

  <HeadingWrapper
      :heading="$t('matchingProfileView.heading.togetherConsumed')"
      route="/profile"
  ></HeadingWrapper>

  <MediaSlider :slides="matchesStore.togetherConsumedMedia" />

  <HeadingWrapper
      :heading="username + $t('matchingProfileView.heading.recommended')"
      route="/profile"
  ></HeadingWrapper>

  <MediaSlider :slides="matchesStore.recommendedMedia" />

  <HeadingWrapper
      :heading="username + $t('matchingProfileView.heading.completeHistory')"
  ></HeadingWrapper>

  <MediaListWrapper />

</template>

<style lang="scss">
@import "@/assets/scss/matching-profile-view/matching-profile.scss";
</style>
