<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import { useMatchesStore } from "@/stores/MatchesStore";
import { Match } from "@/models/Match";
import { secondsToMinutes } from "@/composables/TimeCalculations";
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
import {useI18n} from "vue-i18n";
import ProfileImage from "@/components/icons/ProfileImage.vue";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
})

const { t } = useI18n()

const matchesStore = useMatchesStore()

const hasMatch: Ref<boolean> = ref(matchesStore.matchesMap.has(props.userId))
const match: Ref<Match> = ref(matchesStore.matchesMap.get(props.userId)!)

// Access of profile image property
const profileImage: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.profileImage)
      ? match.value.profileImage
      : '@/../../public/images/profile_placeholder.png'
})

// Access of username property
const username: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.username)
      ? match.value.username
      : t('matchesView.placeholders.noUsername')
})

// Access of rank property
const rank: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.rank)
      ? (match.value.rank).toString()
      : t('matchesView.placeholders.noRank')
})

// Calculate together listened minutes
const minutes: ComputedRef<string> = computed((): string => {
  return (hasMatch.value && match.value.listenedTogetherSeconds)
      ? secondsToMinutes(match.value.listenedTogetherSeconds)
      : t('matchesView.placeholders.noMinutes')
})

</script>

<template>
  <header>
    <RouterLink :to="{ name: 'MatchesView' }">
      <ArrowLeftIcon />
    </RouterLink>

    <img
        v-if="profileImage"
        class="profile-image"
        :src="profileImage"
        alt="Profile image"
    />
    <ProfileImage
        v-if="!profileImage"
        class="profile-image placeholder"
    />

    <img class="profile-image" :src="profileImage" alt="Profile image" />
    <div class="profile-info">
      <h2>#{{ rank }} {{ username }}</h2>
      <p>{{ minutes }} {{ $t('matchesView.minutesLabel') }}</p>
    </div>
  </header>
</template>
