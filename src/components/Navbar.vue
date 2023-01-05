<script setup lang="ts">
import ShuffleViewIcon from "@/components/icons/navbar/ShuffleViewIcon.vue";
import RankingViewIcon from "@/components/icons/navbar/RankingViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
import { useMainStore } from "@/stores/MainStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { onMounted } from "vue";
import ProfileService from "@/services/ProfileService";
import ProfileHeader from "@/components/profile-view/ProfileHeader.vue";

const mainStore = useMainStore()
const profileStore = useProfileStore()

onMounted(async () => {
  // Fetch the profile information, if the object is empty
  if (JSON.stringify(profileStore.profileInformation) === '{}') {
    profileStore.profileInformation = await ProfileService.fetchProfileInformation()
  }
})
</script>

<template>
  <nav id="navbar">

    <ProfileHeader
        v-if="mainStore.isDesktop"
        :profile-information="profileStore.profileInformation"
    />

    <RouterLink :to="{ name: 'ShuffleView' }">
      <ShuffleViewIcon />
      <span>Shuffle</span>
    </RouterLink>
    <RouterLink :to="{ name: 'MatchesView' }">
      <RankingViewIcon />
      <span>matches</span>
    </RouterLink>
    <RouterLink :to="{ name: 'ProfileView' }">
      <ProfileViewIcon />
      <span>Profile</span>
    </RouterLink>
  </nav>
</template>

<style lang="scss">
@import "@/assets/scss/navbar.scss";
</style>
