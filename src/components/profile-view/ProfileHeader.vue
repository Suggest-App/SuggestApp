<script setup lang="ts">
import InfoIcon from "@/components/icons/controls/InfoIcon.vue";
import {computed, PropType} from "vue";
import type { ProfileInformation } from "@/models/ProfileInformation";

const props = defineProps({
  profileInformation: {
    type: Object as PropType<ProfileInformation>,
    required: true,
  },
})

const username = computed(() => {
  return props.profileInformation.username
})

const trackingSince = computed(() => {
  return props.profileInformation.tackingSince
})

const showTrackingSince = computed(() => {
  return props.profileInformation.tackingSince !== undefined
})
</script>

<template>
  <header>
    <div class="profile-image"></div>
    <div class="profile-info">
      <h2>{{ username }}</h2>
      <p v-if="showTrackingSince">tracking since {{ trackingSince }} <InfoIcon /></p>
    </div>
  </header>
</template>
