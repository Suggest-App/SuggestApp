import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProfileInformation } from "@/models/ProfileInformation";
import type { MediaSummary } from "@/models/MediaSummary";

export const useProfileStore = defineStore('profileStore', () => {

  // The users own profile information
  const profileInformation: Ref<ProfileInformation> = ref({} as ProfileInformation)

  // The users own personal summary (most heard tracks)
  const personalSummary: Ref<MediaSummary[]> = ref([])

  // Flag that indicates if the personal summary is loading
  const isLoading: Ref<boolean> = ref(true)

  return {
    profileInformation,
    personalSummary,
    isLoading
  }
})
