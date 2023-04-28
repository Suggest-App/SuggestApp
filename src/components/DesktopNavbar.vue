<script setup lang="ts">
import {computed, onMounted} from "vue";
import type { ComputedRef } from "vue";
import { useRoute } from "vue-router";
import MatchesViewIcon from "@/components/icons/navbar/MatchesViewIcon.vue";
import ProfileViewIcon from "@/components/icons/navbar/ProfileViewIcon.vue";
import ProfileImageWrapper from "@/components/ProfileImageWrapper.vue";
import ProfileInfoGrid from "@/components/ProfileInfoGrid.vue";
import ProfileInfoColumn from "@/components/ProfileInfoColumn.vue";
import {User} from "@/classes/User";
import {useProfileStore} from "@/stores/ProfileStore";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import ConnectionIcon from "@/components/icons/ConnectionIcon.vue";
import {useMainStore} from "@/stores/MainStore";

const route = useRoute()
const mainStore = useMainStore()
const profileStore = useProfileStore()

onMounted(async () => {
  // Fetch the profile information and set the user object properties
  await profileStore.fetchUserProfile()
      .then(() => mainStore.isLoading = false)
      .catch(e => console.log(e))
})

// The user profile object from the store
const profile: ComputedRef<User> = computed(() => {
  return (profileStore.profile instanceof User) ? profileStore.profile : new User()
})

// Bool that indicates, if the matches icon should be active, when matching profile is viewed
const inMatchingProfileView: ComputedRef<boolean> = computed((): boolean => {
  return (route.path.includes('matching-profile'))
})
</script>

<template>
  <nav id="desktop-navbar">

    <ProfileImageWrapper :image-src="profile.getProfileImgSrc()" />

    <ProfileInfoGrid>
      <template #columns>
        <ProfileInfoColumn
            :label-text="$t('profileInfo.totalListenedTime')"
            :value="profile.getTotalListenedTime()"
        />
        <ProfileInfoColumn
            :label-text="$t('profileInfo.songTrackingSince')"
            :value="profile.getTrackingSince()"
        />
        <ProfileInfoColumn
            :label-text="$t('profileInfo.lastFetch')"
            :value="profile.getLastFetched()"
        />
      </template>
    </ProfileInfoGrid>

    <RouterLink :to="{ name: 'matches' }" :class="{ active: inMatchingProfileView }">
      <MatchesViewIcon />
      <span>{{ $t('navbar.matches') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'profile' }">
      <ProfileViewIcon />
      <span>{{ $t('navbar.profile') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'settings' }">
      <SettingsIcon />
      <span>{{ $t('navbar.settings') }}</span>
    </RouterLink>

    <RouterLink :to="{ name: 'connected-apps' }">
      <ConnectionIcon />
      <span>{{ $t('navbar.connection') }}</span>
    </RouterLink>

  </nav>
</template>

<style lang="scss">
#desktop-navbar {
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: $primary-background-color;
  padding-top: 25px;

  .base-wrapper.info-grid {
    margin-bottom: 65px;
  }

  a {
    width: 100%;
    @include flex-center-y;
    justify-content: flex-start;
    column-gap: 12px;
    margin-bottom: $wrapper-bottom-margin;
    padding: 0 45px;
  }

  svg:not(.profile-image) {
    width: 22px;
    height: 20px;
  }

  a span {
    font-size: $font-size-m;
  }
}

@media only screen and (min-width: 991px) {
  #desktop-navbar {
    max-width: 450px;
    padding-top: 45px;

    .base-wrapper {
      padding: 0 $wrapper-padding-x;
    }
  }
}
</style>
