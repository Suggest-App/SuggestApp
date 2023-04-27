<script lang="ts" setup>
import { useMainStore } from "@/stores/MainStore";
import NotFoundView from "@/views/NotFoundView.vue";
const mainStore = useMainStore ()

defineProps({
  hasLoadingAnim: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
 <div class="base-wrapper nav-grid" :class="{ 'sk-anim': (mainStore.isLoading && hasLoadingAnim) }">
   <div class="left">
     <slot name="left"></slot>
   </div>
   <div class="middle">
     <slot name="middle"></slot>
   </div>
   <div class="right">
     <slot name="right"></slot>
   </div>
 </div>
</template>

<style lang="scss">
.base-wrapper.nav-grid {
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.4fr;

  .left, .middle, .right {
    @include flex-center-y;
  }

  .left {
    grid-column: 1 / 2;
  }

  .middle {
    grid-column: 2 / 3;

    h2 {
      width: 100%;
      text-align: center;
      font-weight: 500;
    }
  }

  .right {
    grid-column: 3 / 4;
    column-gap: 8px;
  }
}

// Profile view is the only exception until now, where no margin is needed
#profile-view .base-wrapper.nav-grid {
  margin-bottom: 0;
}

@media only screen and (min-width: 768px) {
  .base-wrapper.nav-grid {
    display: flex;
    column-gap: 25px;
    max-width: unset;
    margin-bottom: 35px;
  }
}
</style>
