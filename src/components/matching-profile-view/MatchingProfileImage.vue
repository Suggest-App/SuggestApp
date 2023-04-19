<script lang="ts" setup>
import ProfileImage from "@/components/icons/ProfileImage.vue";
import {  computed } from "vue";
import type { PropType, ComputedRef } from "vue";
import type { Match } from "@/models/Match";
import {useI18n} from "vue-i18n";

// Initialize localization plugin
const { t } = useI18n()

// Props from parent component
const props = defineProps({
  hasMatch: {
    type: Boolean,
    default: false
  },
  match: {
    type: Object as PropType<Match>,
    default: false
  }
})

/** --------------------- Template Properties --------------------- */

// Access of profile image property
const profileImage: ComputedRef<string | null> = computed(() => {
  return (props.hasMatch && props.match.profileImage)
      ? props.match.profileImage
      : null
})

// Access of rank property
const rank: ComputedRef<string> = computed(() => {
  return (props.hasMatch && props.match.rank)
      ? '#' + (props.match.rank).toString()
      : '-'
})
</script>

<template>
  <div class="profile-image-wrapper">
    <img
        v-if="profileImage"
        class="profile-image"
        :src="profileImage"
        alt="Profile image"
    />
    <ProfileImage
        v-if="!profileImage"
    />
    <span class="rank">{{ rank }}</span>
  </div>
</template>
