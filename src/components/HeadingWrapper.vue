<script lang="ts" setup>
import { useMainStore } from "@/stores/MainStore";
const mainStore = useMainStore()

defineProps({
  heading: {
    type: String,
    required: true
  },
  hasMaxWidth: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="base-wrapper heading" :class="{ 'sk-anim': mainStore.isLoading, 'no-max-width': !hasMaxWidth}">
    <h2>{{ heading }}</h2>
    <slot name="label"></slot>
  </div>
</template>

<style lang="scss">
.base-wrapper.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span, a {
    color: $secondary-text-color;
    font-size: $font-size-s;
  }

  a {
    text-decoration: underline;
  }
}

.base-wrapper.heading.no-max-width {
  max-width: unset;
}
</style>
