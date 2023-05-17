<script lang="ts" setup>
import { useMainStore } from "@/stores/MainStore";
const mainStore = useMainStore()

</script>

<template>
  <div class="base-wrapper media-list">
    <slot name="media-elements"></slot>
    <slot name="skeleton-elements">
      <MediaListElement
          v-show="mainStore.isLoading"
          v-for="index in 10"
          :key="index"
      />
    </slot>
  </div>
</template>


