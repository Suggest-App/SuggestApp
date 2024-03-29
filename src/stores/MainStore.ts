import {ref, watch} from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserMatch } from "@/classes/UserMatch";
import MatchesService from "@/services/MatchesService";
import {useRoute} from "vue-router";
import type {Media} from "@/models/Media";
import type {ProfileMedia} from "@/models/ProfileMedia";
import {useProfileStore} from "@/stores/ProfileStore";
import {useMatchesStore} from "@/stores/MatchesStore";
import {User} from "@/classes/User";

export const useMainStore = defineStore('mainStore', () => {

    const route = useRoute()

  // Flag that indicates if the viewport with is at least 768px
  const isDesktop: Ref<boolean> = ref(window.innerWidth >= 768)

  // Flag that renders sk loading animation until axios requests are awaited
  const isLoading: Ref<boolean> = ref(true)

  const listFilterDate: Ref<string> = ref('')

  // Check viewport with on resize
  window.onresize = (): void => {
    isDesktop.value =  (window.innerWidth >= 768)
  }

  // Check if the body should have the additional 'no-scroll' class on loading
  watch(() => isLoading.value, () =>  {
        (isLoading.value)
            ? document.body.classList.add('no-scroll')
            : document.body.classList.remove('no-scroll')
      }
  )

  /**
   * Update the media summary after date filter change
   *
   * @param view string
   * @param profileStore any
   * @param matchesStore any
   *
   * @return @void
   */
   async function updateListFilter(view: string, profileStore: any, matchesStore: any): Promise<void> {
      switch (view) {
          case 'profile':
              if (profileStore.profile) {
                  const summary = await MatchesService.fetchMatchSummary(profileStore.profile.getUserId() as string, 100, listFilterDate.value)
                  profileStore.profile.setMediaSummary(summary)
              }
              break
          case 'matching-profile':
              const match = matchesStore.getUserMatchByUid(route.params.id as string)
              const summary = await MatchesService.fetchMatchSummary(route.params.id as string, 100, listFilterDate.value)
              match.setMediaSummary(summary)
              break
      }
   }

    return { isDesktop, isLoading, listFilterDate, updateListFilter }
})
