<script lang="ts" setup>
import { secondsToTime } from "@/composables/MediaInformationFormatting";
defineProps({
  listenedSecondsYou: {
    type: Number,
    required: false
  },
  listenedSecondsMatch: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="tracking-information">
      <span class="user-wrapper">
        <span class="name">Du:</span>
        <span>{{ secondsToTime(listenedSecondsYou) }}</span>
      </span>
    <span class="user-wrapper">
        <span class="name">Match:</span>
        <span>{{ secondsToTime(listenedSecondsMatch) }}</span>
      </span>
  </div>
</template>


<style lang="scss">
.tracking-information {
  margin-bottom: 10px;

  .user-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3px;

    span {
      font-size: $font-size-xs;
    }

    .name {
      color: $secondary-text-color;
    }
  }
}
</style>
