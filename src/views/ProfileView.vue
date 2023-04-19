<script setup lang="ts">
import { onMounted } from "vue"
import ProfileHeader from "@/components/profile-view/ProfileHeader.vue";
import ConnectedAppsBtn from "@/components/elements/ConnectedAppsBtn.vue";
import Media from "@/components/media/Media.vue";
import ProfileService from "@/services/ProfileService";
import { useProfileStore } from "@/stores/ProfileStore";
import { useMainStore } from "@/stores/MainStore";
import ProfileViewSkeleton from "@/components/profile-view/ProfileViewSkeleton.vue";
import router from "@/router";

const profileStore = useProfileStore()
const mainStore = useMainStore()

onMounted(async () => {
  profileStore.personalSummary = await ProfileService.fetchPersonalSummary()

  // Ensure that there is a personal summary before disabling the loading flag
  if (profileStore.personalSummary.length > 0) {
    profileStore.isLoading = false
  }
})
</script>

<template>
  <div id="profile-view">

    <ProfileHeader
        v-if="!mainStore.isDesktop"
        v-show="!profileStore.isLoading"
    />

    <ConnectedAppsBtn
        v-if="!mainStore.isDesktop"
        v-show="!profileStore.isLoading"
        @click="router.push({ name: 'ConnectedAppsView'})"
    />

    <div class="heading-wrapper">
      <h3 v-show="!profileStore.isLoading" >{{ $t('profileView.heading') }}</h3>
      <a href="http://spotify.com/" target="_blank">
        <img
            class="spotify-logo"
            src="@/../public/images/Spotify_Logo_RGB_Green.png"
            alt="Spotify Logo RGB Green"
        />
      </a>
    </div>

    <Media
      v-show="!profileStore.isLoading"
      v-for="(media, index) in profileStore.personalSummary"
      :key="index"
      :media="media"
      :index="index"
    />

    <ProfileViewSkeleton v-if="profileStore.isLoading" />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/profile-view/profile-view.scss";
</style>
