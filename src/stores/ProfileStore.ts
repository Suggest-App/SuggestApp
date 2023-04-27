import {ref, } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { User } from "@/classes/User";
import ProfileService from "@/services/ProfileService";

export const useProfileStore = defineStore('profileStore', () => {

  // The own user profile object
  const profile: Ref<User> = ref(new User()) as Ref<User>

  /**
   * Fill the user profile object with the fetched data
   *
   * @return Promise<void>
   */
  async function fetchUserProfile(): Promise<void> {

    // Bool that indicates, if profile infos need to be fetched
    const fetchProfileInfo =
        !profile.value.getUsername() ||
        !profile.value.getProfileImgSrc() ||
        !profile.value.getTotalListenedTime() ||
        !profile.value.getTrackingSince() ||
        !profile.value.getLastFetched()

    // If there are infos that need to be fetched
    if (fetchProfileInfo) {

      // Fetch profile information and the personal media summary
      const information = await ProfileService.fetchProfileInformation()
      const summary = await ProfileService.fetchPersonalSummary()

      // Initialize new User object
      const user = new User()

      // Set the User properties, from the /profile-information endpoint
      user.setUsername(information.username)
      user.setProfileImgSrc(information.profileImage)
      user.setTotalListenedTime(information.totalListenedSeconds)
      user.setTrackingSince(information.trackingSince)
      user.setLastFetched(information.lastFetch)

      // Set the media array from the /personal-summary endpoint
      user.setMediaSummary(summary)

      // Overwrite the profile ref
      profile.value = user
    }
  }

  return {
    profile,
    fetchUserProfile
  }
})
