import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type {Match} from "@/models/Match";


export const useMatchesStore = defineStore('matchesStore', () => {

  const matches: Ref<Match[]> = ref([])

  return { matches }
})
