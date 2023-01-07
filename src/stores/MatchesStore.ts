import { reactive, ref} from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type {Match} from "@/models/Match";
import type {MediaSummary} from "@/models/MediaSummary";

export const useMatchesStore = defineStore('matchesStore', () => {

  // Array that holds all user matches
  const matches: Ref<Match[]> = ref([])

  // Pool that contains the whole asset data objects
  const matchesMap: Map<string, Match> = reactive(
      new Map<string, Match>()
  )

  // Flag that indicates if the matches are loading
  const isLoading: Ref<boolean> = ref(true)

  // Array that holds the media from a match that the user don't know
  const recommendedMedia: Ref<MediaSummary[]> = ref([] as MediaSummary[]);

  return { matches, matchesMap, isLoading, recommendedMedia }
})
