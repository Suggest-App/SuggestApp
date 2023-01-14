<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { getSpotifyToken } from "@/services/TokenService";
import type { SpotifyToken } from "@/models/SpotifyToken";

const token: Ref<SpotifyToken> = ref({} as SpotifyToken)

onMounted(async () => {

})
</script>

<template>
  <div></div>
</template>
