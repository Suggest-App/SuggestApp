<script setup lang="ts">
import { PropType } from "vue";
import { Match } from "@/models/Match";

const props = defineProps({
  match: {
    type: Object as PropType<Match>,
    required: false,
  },
})
</script>

<template>
  <div class="match-container">
    <div class="rank">1</div>
    <div class="profile-image"></div>
    <div class="profile-information">
      <p class="profile-name">Sebastian Claes</p>
      <p class="listened-together">10.342 minutes listened together</p>
    </div>
  </div>
</template>
