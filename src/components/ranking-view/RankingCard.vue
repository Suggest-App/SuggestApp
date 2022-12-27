<script setup lang="ts">
import { PropType } from "vue";
import { User } from "@/models/User";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})
</script>

<template>
  <div class="ranking-card">
    <div class="rank">1</div>
    <div class="profile-image"></div>
    <div class="profile-info-wrapper">
      <p class="profile-name">{{ props.user.accountName }}</p>
      <h3 class="shared-minutes">12.682 gemeinsame Minuten gehört</h3>
    </div>
  </div>
</template>
