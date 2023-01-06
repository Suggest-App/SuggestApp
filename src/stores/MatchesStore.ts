import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type {Match} from "@/models/Match";
import Media from "@/components/Media.vue";
import type {MediaSummary} from "@/models/MediaSummary";

export const useMatchesStore = defineStore('matchesStore', () => {

  // Array that holds all user matches
  const matches: Ref<Match[]> = ref([])

  // Flag that indicates if the matches are loading
  const isLoading: Ref<boolean> = ref(true)

  const selectedMatch: Ref<Match> = ref({} as Match);

  const recommendedMedia: Ref<MediaSummary[]> = ref([] as MediaSummary[]);

  return { matches, isLoading, selectedMatch, recommendedMedia }
})
