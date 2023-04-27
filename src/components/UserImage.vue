<script setup lang="ts">
import ProfileImagePlaceholder from "@/components/icons/ProfileImagePlaceholder.vue";

defineProps({
  imageSrc: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <ProfileImagePlaceholder
      v-if="imageSrc === ''"
  />
  <img
      v-if="imageSrc !== ''"
      :src="imageSrc"
      class="profile-image"
      alt="Profile Image"
      loading="lazy"
  />
</template>

<style lang="scss">
.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
