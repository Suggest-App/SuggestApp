<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref, ComputedRef, PropType} from "vue";
import { Match } from "@/models/Match";
import { secondsToMinutes } from "@/composables/TimeCalculations";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  match: {
    type: Object as PropType<Match>,
    required: true,
  }
})

// Access of rank property
const rank: ComputedRef<string> = computed((): string => {
  return (props.match && props.match.rank)
      ? (props.match.rank).toString()
      : t('matchesView.placeholders.noRank')
})

// Access profile image prop
const profileImage: ComputedRef<string> = computed((): string => {
  return (props.match && props.match.profileImage)
      ? props.match.profileImage
      : t('matchesView.placeholders.noProfileImage')
})

// Access of username prop
const username: ComputedRef<string> = computed((): string => {
  return (props.match && props.match.username)
      ? props.match.username
      : t('matchesView.placeholders.noUsername')
})

// Bool that indicates if together listened minutes should be displayed
const showMinutes: Ref<boolean> = ref(props.match.listenedTogetherSeconds != null)

// Value of how much  minutes both have listened together
const minutes:ComputedRef<string> = computed((): string => {
  return (props.match && showMinutes)
      ? secondsToMinutes(props.match.listenedTogetherSeconds)
      : t('matchesView.placeholders.noMinutes')
})
</script>

<template>
  <div class="match-container">
    <div class="rank">{{ rank }}</div>
    <img
        class="profile-image"
        :src="profileImage"
        alt="Profile image"
    />
    <div class="profile-information">
      <p class="profile-name">{{ username }}</p>
      <p class="listened-together">{{ minutes }} {{ $t('matchesView.minutesLabel') }}</p>
    </div>
  </div>
</template>
