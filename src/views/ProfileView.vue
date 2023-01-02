<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Ref } from "vue"
import ProfileHeader from "@/components/profile-view/ProfileHeader.vue";
import ConnectedAppsBtn from "@/components/profile-view/ConnectedAppsBtn.vue";
import Navbar from "@/components/Navbar.vue";
import Media from "@/components/Media.vue";
import ProfileService from "@/services/ProfileService";
import type { ProfileInformation } from "@/models/ProfileInformation";
import type { MediaSummary } from "@/models/MediaSummary";

const profileInformation: Ref<ProfileInformation> = ref({} as ProfileInformation)
const personalSummary: Ref<MediaSummary[]> = ref([] as MediaSummary[])

// Fetch and generate the asset list
onMounted(async () => {
  profileInformation.value = await ProfileService.fetchProfileInformation()
  personalSummary.value = await ProfileService.fetchPersonalSummary()
})

</script>

<template>
  <div id="profile-view">
    <ProfileHeader :profile-information="profileInformation" />
    <ConnectedAppsBtn />
    <h3>Your favorite tracks</h3>
    <Media
      v-for="(media ,index) in personalSummary"
      :key="index"
      :media="media"
      :index="index"
    />
    <Navbar />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/profile-view/profile-view.scss";
</style>
