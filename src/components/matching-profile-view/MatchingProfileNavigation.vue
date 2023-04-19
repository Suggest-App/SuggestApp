<script lang="ts" setup>
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

// Initialize localization plugin and stores
const { t } = useI18n()

// Props from parent component
const props = defineProps({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    default: ''
  }
})

/** --------------------- Template Properties --------------------- */

const heading: ComputedRef<string> = computed(() => {
  return (props.username)
      ? t('matchingProfileView.introduction') + props.username
      : t('matchingProfileView.errors.unknownUser')
})
</script>

<template>
  <div class="profile-navigation">
    <RouterLink :to="{ name: 'MatchesView' }">
      <ArrowLeftIcon />
    </RouterLink>
    <h2>{{ heading }}</h2>
    <button v-if="false" class="follow-button">{{ $t('matchingProfileView.followBtn') }}</button>
  </div>
</template>
