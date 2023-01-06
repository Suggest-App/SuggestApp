<script setup lang="ts">
import Match from "@/components/matches-view/Match.vue";
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import {onMounted} from "vue";
import MatchesService from "@/services/MatchesService";
import {useMatchesStore} from "@/stores/MatchesStore";
import router from "@/router";
import MatchesViewSkeleton from "@/components/matches-view/MatchesViewSkeleton.vue";

const matchesStore = useMatchesStore()

onMounted(async () => {
  // Fetch the ordered user matches
  matchesStore.matches = await MatchesService.fetchMatches()

  // Ensure that there are matches fetched, before disabling the loading flag
  if (matchesStore.matches.length !== 0) {
    matchesStore.isLoading = false
  }
})
</script>

<template>
  <section id="matches-view">
    <h2 v-show="!matchesStore.isLoading">Your top matches <InfoIcon /></h2>
    <Match
        v-show="!matchesStore.isLoading"
        @click="router.push('/recommended-media')"
        v-for="(match, index) in matchesStore.matches"
        :key="match.userId"
        :match="match"
        :index="index"
    />

    <MatchesViewSkeleton v-if="matchesStore.isLoading" />
   </section>
 </template>

 <style lang="scss">
 @import "@/assets/scss/matches-view/matches-view.scss";
 </style>
