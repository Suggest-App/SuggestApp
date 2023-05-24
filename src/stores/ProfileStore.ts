import {ref, } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { User } from "@/classes/User";
import ProfileService from "@/services/ProfileService";
import { setLocale } from "@/i18n";

export const useProfileStore = defineStore('profileStore', () => {

  // The own user profile object
  const profile: Ref<User | null> = ref(null)

  const selectMediaFlag: Ref<boolean> = ref(false)
  const hiddenMediaCount: Ref<number> = ref((profile.value) ? profile.value.getHiddenMedia().length : 0)

  /**
   * Fill the user profile object with the fetched data
   *
   * @return Promise<void>
   */
  async function fetchUserProfile(): Promise<void> {

    const profileStore = useProfileStore()

    // Ensure that the profile has not already been fetched
    if (!(profile.value instanceof User)) {

      // Fetch profile information and the personal media summary
      const information = await ProfileService.fetchProfileInformation()
      const summary = await ProfileService.fetchPersonalSummary()
      const hiddenMedia = await ProfileService.fetchHiddenMedia()

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

      // Fetch hidden media
      user.setHiddenMedia(hiddenMedia)
      profileStore.hiddenMediaCount = hiddenMedia.length

      // Overwrite the profile ref
      profile.value = user
    }
  }

  /**
   * Fill the user profile object with the fetched data
   *
   * @return Promise<void>
   */
  async function getDiscoverMediaSummary(): Promise<void> {
    const recommendedMedia = await ProfileService.fetchDiscoverMediaSummary()

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
    const profileStore = useProfileStore()
    const hiddenMedia = await ProfileService.fetchHiddenMedia()

    if(profile.value) {
      profile.value.setHiddenMedia(hiddenMedia)
      profileStore.hiddenMediaCount = hiddenMedia.length
    } else {
      await fetchUserProfile()
    }
  }

  return {
    profile,
    selectMediaFlag,
    hiddenMediaCount,
    fetchUserProfile,
    getDiscoverMediaSummary,
    fetchHiddenMedia
  }
})
