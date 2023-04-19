<script lang="ts" setup>
defineProps({
  value: {
    type: String,
    required: true
  },
  labelText: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="stats">
    <span class="value">{{ value }}</span>
    <span class="label" v-html="labelText"></span>
  </div>
</template>
