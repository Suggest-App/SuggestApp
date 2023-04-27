import {ref, watch} from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {

  // Flag that indicates if the viewport with is at least 768px
  const isDesktop: Ref<boolean> = ref(window.innerWidth >= 768)

  // Flag that renders sk loading animation until axios requests are awaited
  const isLoading: Ref<boolean> = ref(true)

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

  return { isDesktop, isLoading }
})
