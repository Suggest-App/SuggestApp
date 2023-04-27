<script lang="ts" setup>
import MediaImagePlaceholder from "@/components/icons/MediaImagePlaceholder.vue";

defineProps({
  src: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="media-image-wrapper">
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
.media-image {
  width: 58px;
  height: 58px;
}
</style>



