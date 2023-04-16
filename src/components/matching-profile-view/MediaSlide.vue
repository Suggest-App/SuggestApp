<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  index: {
    type: Number,
    default: false
  }
})

const showTrackingInformation = computed(() => props.index === 1)
</script>

<template>
  <div class="media-slide">
    <div class="media-image"></div>
    <div class="media-information">
      <span class="title">Can You Feel My Heart</span>
      <span class="artist">Bring Me The Horizon</span>
    </div>
    <div
        v-show="showTrackingInformation"
        class="tracking-information">
      <div class="user-wrapper">
        <span>Du:</span>
        <span>6 Std. 27 Min. </span>
      </div>
      <div class="user-wrapper">
        <span>Tobe:</span>
        <span>6 Std. 27 Min. </span>
      </div>
    </div>
  </div>
</template>
