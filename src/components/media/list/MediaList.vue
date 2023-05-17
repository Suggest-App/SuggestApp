<script lang="ts" setup>
import { useMainStore } from "@/stores/MainStore";
const mainStore = useMainStore()

</script>

<template>
  <div class="base-wrapper media-list">
    <slot name="media-elements"></slot>
    <slot name="skeleton-elements"></slot>
  </div>
</template>


