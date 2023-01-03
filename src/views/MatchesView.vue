<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Match from "@/components/matches-view/Match.vue";
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import {onMounted} from "vue";
import MatchesService from "@/services/MatchesService";
import {useMatchesStore} from "@/stores/MatchesStore";
import router from "@/router";

const matchesStore = useMatchesStore()

onMounted(async () => {
   matchesStore.matches = await MatchesService.fetchMatches()
})
</script>

<template>
  <section id="matches-view">
    <h2>Your top matches <InfoIcon /></h2>
    <Match
        @click="router.push('/recommended-media')"
        v-for="(match,index) in matchesStore.matches"
        :key="match.userId"
        :match="match"
        :index="index"
    />
    <Navbar />
   </section>
 </template>

 <style lang="scss">
 @import "@/assets/scss/matches-view/matches-view.scss";
 </style>
