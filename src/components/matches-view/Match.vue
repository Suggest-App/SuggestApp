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

  </div>
</template>
