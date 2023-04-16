<script lang="ts" setup>
import MediaSlide from "@/components/matching-profile-view/MediaSlide.vue"
import Flicking from "@egjs/vue3-flicking";

defineProps({

})
</script>

<template>
  <div class="media-slider">
    <MediaSlide
        v-for="index in 12"
        :key="index"
        :index="index"
    />
  </div>
</template>
