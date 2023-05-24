<script lang="ts" setup>
import type {ComputedRef, PropType} from "vue";
import type {DiscoverMedia} from "@/models/DiscoverMedia";
import {secondsToTime} from "@/composables/MediaInformationFormatting";
import {computed} from "vue";
import ProfileImagePlaceholder from "@/components/icons/ProfileImagePlaceholder.vue";

const props = defineProps({
  media: {
    type: Object as PropType<DiscoverMedia>,
    default: {} as DiscoverMedia
  }
})

// calculate listened time
const listenedTime: ComputedRef<string> = computed(() => {
  return (props.media && props.media.listenedSeconds)
      ? secondsToTime(props.media.listenedSeconds)
      : ''
})
</script>

<template>
  <div class="match-info-container">
    <img class="profile-image" :src="media.profileUrl" alt="Match Image" v-if="media.profileUrl"/>
    <ProfileImagePlaceholder v-if="!media.profileUrl" />
    <div class="info-wrapper">
      <span class="username">{{ media.username }}</span>
      <span class="listened-time">{{ listenedTime }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.match-info-container {
  width: 110px;
  height: 100%;
  display: flex;
  align-items: center;
  column-gap: 8px;

  .profile-image {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
  }

  .info-wrapper {
    .username {
      font-size: 12px;
      font-weight: 600;
    }

    .listened-time {
      color: $secondary-text-color;
      font-size: 10px;
      font-weight: 600;
    }
  }
}

.listened-time-wrapper {

}
</style>