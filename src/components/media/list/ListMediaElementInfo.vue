<script lang="ts" setup>
defineProps({
  songTitle: {
    type: String,
    required: true
  },
  artists: {
    type: String,
    required: true
  },
  isExplicit: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
<div class="song-info">
  <span class="title">{{ songTitle }}</span>
  <div class="artist-wrapper">
    <span v-if="isExplicit" class="explicit">E</span>
    <span class="artists">{{ artists }}</span>
  </div>
</div>
</template>



<style lang="scss">
.song-info {
  flex: 1;

  .title {
    font-size: $font-size-m;
    margin-bottom: 5px;
  }

  .artist-wrapper {
    @include flex-center-y;
    column-gap: 5px;

    .artists {
      color: $secondary-text-color;
      font-size: $font-size-s;
    }

    .explicit {
      @include flex-center-xy;
      width: 15px;
      height: 15px;
      border-radius: 2px;
      background-color: #404040;
      color: $secondary-text-color;
      font-size: $font-size-xs;
    }
  }
}
</style>
