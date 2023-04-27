<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  selectIsOpen: {
    type: Boolean,
    default: true,
  },
})

// Bind the transform property in order to arrange the select arrow
const transform = computed(() => {
  return !props.selectIsOpen ? 'translate(8 6) rotate(180)' : ''
})
</script>

<template>
  <svg
    :class="{ open: props.selectIsOpen }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 6"
  >
    <path d="M4,0,8,6H0Z" :transform="transform" fill="#787878" />
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  right: 4px;
  transform: translate(-100%, -50%);
  width: 10px;
  height: 8px;
  bottom: 12px;
  pointer-events: none;
}

svg.open {
  margin-top: -1px;
}
</style>
