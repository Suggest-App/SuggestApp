import {ref, } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useMainStore } from "@/stores/MainStore";
import { User } from "@/classes/User";
import ProfileService from "@/services/ProfileService";
import { setLocale } from "@/i18n";

export const useProfileStore = defineStore('profileStore', () => {

  // The own user profile object
  const profile: Ref<User | null> = ref(null)

  const selectMediaFlag: Ref<boolean> = ref(false)
  const hiddenMediaCount: Ref<number> = ref(0)

  /**
   * Fill the user profile object with the fetched data
   *
   * @return Promise<void>
   */
  async function fetchUserProfile(): Promise<void> {

    // Ensure that the profile has not already been fetched
    if (!(profile.value instanceof User)) {

      // Fetch profile information and the personal media summary
      const information = await ProfileService.fetchProfileInformation()
      const summary = await ProfileService.fetchPersonalSummary()

      // Set user locale
      await setLocale(information.language, false)

      // Initialize new User object
      const user = new User()

      // Set the User properties, from the /profile-information endpoint
      user.setUsername(information.username)
      user.setProfileImgSrc(information.profileImage)
      user.setTotalListenedTime(information.totalListenedSeconds)
      user.setTrackingSince(information.trackingSince)
      user.setLastFetched(information.latestFetch)

      // Set the media array from the /personal-summary endpoint
      user.setMediaSummary(summary)

      //await fetchHiddenMedia()

      // Overwrite the profile ref
      profile.value = user
    }
  }

  /**
   * Fill the user profile object with the fetched data
   *
   * @return Promise<void>
   */
  async function fetchRecommendedMediaSummary(): Promise<void> {
    const recommendedMedia = await ProfileService.fetchRecommendedMediaSummary()

    if(!profile.value) {
      await fetchUserProfile()
    }

    if(profile.value && recommendedMedia.length !== 0) {
      profile.value.setRecommendedMediaSummary(recommendedMedia)
    }
  }

  /**
   * Fill the user profile object with the fetched data
   *
   * @return Promise<void>
   */
  async function fetchHiddenMedia(): Promise<void> {
    const hiddenMedia = await ProfileService.fetchHiddenMedia()

    if(!profile.value) {
      await fetchUserProfile()
    }

    if(profile.value && hiddenMedia.length !== 0) {
      profile.value.setHiddenMedia(hiddenMedia)
    }
  }

  return {
    profile,
    selectMediaFlag,
    hiddenMediaCount,
    fetchUserProfile,
    fetchRecommendedMediaSummary,
    fetchHiddenMedia
  }
})
