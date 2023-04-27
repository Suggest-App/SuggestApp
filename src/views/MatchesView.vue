<script setup lang="ts">
import HeadingWrapper from "@/components/HeadingWrapper.vue";
import MatchWrapper from "@/components/MatchWrapper.vue";
import router from "@/router";
import MatchesService from "@/services/MatchesService";
import {computed, onMounted} from "vue";
import type {ComputedRef} from "vue";
import { useMatchesStore } from "@/stores/MatchesStore";
import { useMainStore } from "@/stores/MainStore";
import {UserMatch} from "@/classes/UserMatch";

// Initialize stores
const mainStore = useMainStore()
const matchesStore = useMatchesStore()

onMounted(async () => {
    // Generate the matches map and then disable the loading flag
    await matchesStore.generateMatchesMap()
        .then(() => mainStore.isLoading = false)
        .catch(e => console.log(e))
})

// The user matches map from the matches store
const matchesMap: ComputedRef<Map<string, UserMatch>> = computed(
    () => matchesStore.matchesMap
)

// Redirect to matching profile view when a match has been clicked
function showMatchingProfile(userId: string): void {
  router.push({
    name: 'matching-profile',
    params: { id: userId }
  });
}
</script>

<template id="matches-view">
  <main>
    <HeadingWrapper :heading="$t('headingWrapper.heading.topMatches')" />
    <MatchWrapper
        v-for="[key, match] in matchesMap"
        :key="key"
        :match="match"
        @click="showMatchingProfile(match.getUserId())"
    />
  </main>
</template>
