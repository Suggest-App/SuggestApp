import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type {Match} from "@/models/Match";

export const useMatchesStore = defineStore('matchesStore', () => {

  // Array that holds all user matches
  const matches: Ref<Match[]> = ref([])

  // Flag that indicates if the matches are loading
  const isLoading: Ref<boolean> = ref(true)

  return { matches, isLoading }
})
