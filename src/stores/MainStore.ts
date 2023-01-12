import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {

  // Flag that indicates if the viewport with is at least 768px
  const isDesktop: Ref<boolean> = ref(window.innerWidth >= 768)

  const popupIsOpen: Ref<boolean> = ref(false);

  // Check viewport with on resize
  window.onresize = (): void => {
    isDesktop.value =  (window.innerWidth >= 768)
  }

  return { isDesktop, popupIsOpen }
})
