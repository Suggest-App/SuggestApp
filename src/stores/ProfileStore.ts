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

  const activeLocale: Ref<'en' | 'de'> = ref('de')

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

  return {
    profile,
    fetchUserProfile,
    fetchRecommendedMediaSummary
  }
})
