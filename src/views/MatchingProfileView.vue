<script lang="ts" setup>
import MatchingProfileNavigation from "@/components/matching-profile-view/MatchingProfileNavigation.vue";
import HeadingWrapper from "@/components/matching-profile-view/HeadingWrapper.vue";
import ProfileStat from "@/components/matching-profile-view/ProfileStat.vue";
import ListMedia from "@/components/matching-profile-view/ListMedia.vue";
import MediaSlider from "@/components/matching-profile-view/MediaSlider.vue";
import MatchingProfileImage from "@/components/matching-profile-view/MatchingProfileImage.vue";
import ProfileStatsWrapper from "@/components/matching-profile-view/ProfileStatsWrapper.vue";
import { onMounted, ref} from "vue";
import { useRoute } from "vue-router";
import { useMatchesStore } from "@/stores/MatchesStore";
import { useI18n } from "vue-i18n";
import type { Ref } from "vue";
import type { Match } from "@/models/Match";
import MatchesService from "@/services/MatchesService";

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
</script>

<template>
  <MatchingProfileNavigation
      :user-id="userId"
  />

  <MatchingProfileImage
      :has-match="hasMatch"
      :match="match"
  />

  <ProfileStatsWrapper>
      <ProfileStat
          value="1.206 Std. 27 Min."
          label-text="Musik gehört<br>insgesamt"
      />
      <ProfileStat
          value="6 Std. 27 Min."
          label-text="gemeinsam<br>gehörte Zeit"
      />
      <ProfileStat
          value="03.01.2023"
          label-text="Song Erfassung<br>seit dem"
      />
  </ProfileStatsWrapper>

  <HeadingWrapper
      heading="Songs die ihr beide feiert:"
      label-text="Alle anzeigen"
      route="/profile"
  ></HeadingWrapper>

  <MediaSlider :slides="matchesStore.togetherConsumedMedia" tracked-time="6 Std. 27 Min." />

  <HeadingWrapper
      heading="Tobe feiert außerdem:"
      label-text="Alle anzeigen"
      route="/profile"
  ></HeadingWrapper>

  <MediaSlider :slides="matchesStore.recommendedMedia" trackedTime="0 Min."/>

  <HeadingWrapper
      heading="Tobe’s gesamte Songhistorie: "
      label-text="gehörte Zeit:"
  ></HeadingWrapper>

  <div class="media-list-container">
    <ListMedia
        v-for="(media, index) in matchesStore.togetherConsumedMedia"
        :key="index"
        :media="media"
        :index="index"
    />
  </div>

</template>

<style lang="scss">
@import "@/assets/scss/redesign-theme.scss";
@import "@/assets/scss/matching-profile-view/matching-profile.scss";
</style>
