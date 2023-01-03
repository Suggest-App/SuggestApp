import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProfileInformation } from "@/models/ProfileInformation";
import type { MediaSummary } from "@/models/MediaSummary";

export const useProfileStore = defineStore('profileStore', () => {

  const profileInformation: Ref<ProfileInformation> = ref({} as ProfileInformation)
  const personalSummary: Ref<MediaSummary[]> = ref([] as MediaSummary[])

  const isLoading: Ref<boolean> = ref(false)

  return {
    profileInformation,
    personalSummary,
    isLoading
  }
})
