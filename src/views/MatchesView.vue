<script setup lang="ts">
import Match from "@/components/matches-view/Match.vue";
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import { onMounted } from "vue";
import { useMatchesStore } from "@/stores/MatchesStore";
import { useMainStore } from "@/stores/MainStore";
import { fetchUserMatches } from "@/composables/GenerateMaps";
import MatchesViewSkeleton from "@/components/matches-view/MatchesViewSkeleton.vue";
import router from "@/router";
import { MediaSummary } from "@/models/MediaSummary";
import { matchesInformationPopup } from "@/composables/InformationPopup";

// Initialize stores
const matchesStore = useMatchesStore()
const mainStore = useMainStore()

onMounted(async () => {
  // Fetch the ordered user matches
  await fetchUserMatches()
  // Always clear the recommended media
  matchesStore.recommendedMedia = [] as MediaSummary[]
  // Ensure that there are matches fetched, before disabling the loading flag
  if (matchesStore.matches.length !== 0) {
    matchesStore.isLoading = false
  }
})

// Show matching profile view
function showMatchingProfile(userId: string): void {
  // Set the loading flag to true
  matchesStore.isLoading = true
  // Redirect to recommended media view
  router.push({
    name: 'MatchingProfileView',
    params: { id: userId }
  });
}
</script>

<template>
  <section id="matches-view">
    <h2 v-show="!matchesStore.isLoading">{{ $t('matchesView.heading') }} <InfoIcon @click="matchesInformationPopup" /></h2>
    <Match
        v-show="!matchesStore.isLoading"
        @click="showMatchingProfile(match.userId)"
        v-for="match in matchesStore.matches"
        :key="match.userId"
        :match="match"
    />
    <MatchesViewSkeleton v-if="matchesStore.isLoading" />
   </section>
 </template>

 <style lang="scss">
 @import "@/assets/scss/matches-view/matches-view.scss";
 </style>
