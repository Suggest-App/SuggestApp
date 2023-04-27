<script lang="ts" setup>
import { useMainStore } from "@/stores/MainStore";
const mainStore = useMainStore()

defineProps({
  value: {
    type: String,
    required: true
  },
  labelText: {
    type: String,
    required: true
  },
  hasLoadingAnim: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="info-column" :class="{ 'sk-anim': (mainStore.isLoading && hasLoadingAnim) }">
    <span class="value">{{ value }}</span>
    <span class="label" v-html="labelText"></span>
  </div>
</template>

<style lang="scss">
.info-column {
  @include flex-center-xy;
  flex-direction: column;

  .value {
    color: $primary-text-color;
    font-size: $font-size-s;
    margin-bottom: 5px;
  }

  .label {
    color: $secondary-text-color;
    font-size: $font-size-xs;
    text-align: center;
  }
}
</style>
