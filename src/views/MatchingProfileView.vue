<script lang="ts" setup>
import MediaList from "@/components/media/list/MediaList.vue";
import MediaListElement from "@/components/media/list/MediaListElement.vue";
import HeadingWrapper from "@/components/HeadingWrapper.vue";
import MediaSlider from "@/components/media/slider/MediaSlider.vue";
import {computed, onMounted} from "vue";
import type {ComputedRef} from "vue";
import {useMatchesStore} from "@/stores/MatchesStore";
import {useI18n} from "vue-i18n";
import {useMainStore} from "@/stores/MainStore";
import {UserMatch} from "@/classes/UserMatch";
import {useRoute} from "vue-router";
import MobileMatchProfile from "@/components/MobileMatchProfile.vue";
import DateFilter from "@/components/DateFilter.vue";
import DesktopMatchProfile from "@/components/DesktopMatchProfile.vue";
import {secondsToTime} from "@/composables/MediaInformationFormatting";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()
const matchesStore = useMatchesStore()

// Get the user id from the current route
const route = useRoute()
const userId: string = route.params.id as string

onMounted(async () => {
  // Fetch the user match properties and update the UserMach object from the map based on its uid
  await matchesStore.fetchUserMatchProperties(userId)
      .then(() => mainStore.isLoading = false)
      .catch(e => console.log(e))
})

// Get the user match from the map by its uid
const match: ComputedRef<UserMatch> = computed(
    () => matchesStore.getUserMatchByUid(userId)
)

// calculate listened time
function getListenedTime(seconds: number) {
  return (seconds)
      ? secondsToTime(seconds)
      : ''
}
</script>

<template>
  <main id="matching-profile-view">
    <MobileMatchProfile :match="match" v-if="!mainStore.isDesktop" />
    <DesktopMatchProfile :match="match" v-if="mainStore.isDesktop" />

    <HeadingWrapper
        :heading="$t('headingWrapper.heading.togetherConsumed')"
        :has-max-width="false"
    >
      <template #label>
        <RouterLink v-if="false" :to="{ name: 'all-media', params: { endpoint: '/together-consumed', id: match.getUserId() }}">
          {{ $t('headingWrapper.label.showAll') }}
        </RouterLink>
      </template>
    </HeadingWrapper>

    <MediaSlider :slides="match.getTogetherConsumedMedia()" media-type="together" />

    <HeadingWrapper
        :heading="match.getUsername() + $t('headingWrapper.heading.recommendedMedia')"
        :has-max-width="false"
    >
      <template #label>
        <RouterLink v-if="false" :to="{ name: 'all-media', params: { endpoint: '/recommended-media', id: match.getUserId() } }">
          {{ $t('headingWrapper.label.showAll') }}
        </RouterLink>
      </template>
    </HeadingWrapper>

    <MediaSlider :slides="match.getRecommendedMedia()" media-type="profile" />

    <HeadingWrapper :heading="match.getUsername() + $t('headingWrapper.heading.othersCompleteHistory')">
      <template #label>
        <span>{{ $t('headingWrapper.label.listenedTime') }}</span>
      </template>
    </HeadingWrapper>

    <DateFilter view="matching-profile" />

    <MediaList>
      <template #media-elements>
        <MediaListElement
            v-show="!mainStore.isLoading"
            v-for="(media, index) in match.getMediaSummary()"
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
@media only screen and (min-width: 768px) {
  #matching-profile-view {
    overflow-x: hidden;
  }
}
</style>
