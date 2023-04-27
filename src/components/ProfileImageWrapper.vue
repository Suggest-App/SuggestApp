<script lang="ts" setup>
import UserImage from "@/components/UserImage.vue";
import { useMainStore } from "@/stores/MainStore";

const mainStore = useMainStore()

defineProps({
  imageSrc: {
    type: String,
    default: ''
  },
  hasLoadingAnim: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="base-wrapper">
    <div class="image-wrapper" :class="{ 'sk-anim': (mainStore.isLoading && hasLoadingAnim) }">
      <UserImage :image-src="imageSrc" />
      <slot name="rank"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.image-wrapper {
  position: relative;
  width: 75px;
  height: 75px;
  margin: 0 auto;

  .rank {
    @include flex-center-xy;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: $secondary-background-color;
    font-size: $font-size-xs;
    font-weight: bold;
  }
}
</style>
