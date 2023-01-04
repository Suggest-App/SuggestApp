<script setup lang="ts">
import { onMounted } from "vue"
import ProfileHeader from "@/components/profile-view/ProfileHeader.vue";
import ConnectedAppsBtn from "@/components/profile-view/ConnectedAppsBtn.vue";
import Navbar from "@/components/Navbar.vue";
import Media from "@/components/Media.vue";
import ProfileService from "@/services/ProfileService";
import { useProfileStore } from "@/stores/ProfileStore";
import ProfileViewSkeleton from "@/components/profile-view/ProfileViewSkeleton.vue";

const profileStore = useProfileStore()

onMounted(async () => {

  // Fetch all profile view related data
  profileStore.profileInformation = await ProfileService.fetchProfileInformation()
  profileStore.personalSummary = await ProfileService.fetchPersonalSummary()

  // Ensure that there are is a personal summary before disabling the loading flag
  if (profileStore.personalSummary.length !== 0) {
    profileStore.isLoading = false
  }
})
</script>

<template>
  <div id="profile-view">

    <ProfileHeader
        v-show="!profileStore.isLoading"
        :profile-information="profileStore.profileInformation"
    />

    <ConnectedAppsBtn v-show="!profileStore.isLoading" />
    <h3 v-show="!profileStore.isLoading" >Your favorite tracks</h3>

    <Media
      v-show="!profileStore.isLoading"
      v-for="(media, index) in profileStore.personalSummary"
      :key="index"
      :media="media"
      :index="index"
    />

    <ProfileViewSkeleton v-show="profileStore.isLoading" />

    <Navbar />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/profile-view/profile-view.scss";
</style>
