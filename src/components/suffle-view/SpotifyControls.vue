<script setup lang="ts">
import PlayMedia from "@/components/icons/controls/PlayMediaIcon.vue";
</script>

<template>
  <div class="spotify-controls">
    <div class="spotify-track"></div>
    <div class="spotify-btn-wrapper">
      <button class="spotify-play-btn">
        <PlayMedia />
      </button>
    </div>
  </div>
</template>
