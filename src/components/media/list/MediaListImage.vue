<script lang="ts" setup>
import MediaImagePlaceholder from "@/components/icons/MediaImagePlaceholder.vue";
import { useProfileStore } from "@/stores/ProfileStore";

const profileStore = useProfileStore()

defineProps({
  src: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="media-image-wrapper" :class="{ active : profileStore.selectMediaFlag}">
    <MediaImagePlaceholder
        v-if="src === ''"
    />
    <img
        v-if="src !== ''"
        v-lazy="src"
        class="media-image"
        alt="Media Image"
    />
  </div>
</template>

<style lang="scss">
.media-image-wrapper.active {
  animation: shake 0.35s;
  animation-iteration-count: infinite;
  cursor: pointer;
}

.media-image {
  width: 58px;
  height: 58px;
}
</style>



